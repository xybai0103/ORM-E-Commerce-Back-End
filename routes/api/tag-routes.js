const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags including its associated Product data
router.get('/', async(req, res) => {
  try{
    const tagData = await Tag.findAll({
      include: [{model: Product, through: ProductTag, as: 'tag_products'}]
    });
    res.status(200).json(tagData);
  }catch(err){
    res.status(500).json(err);
  }
});

// find a single tag by its `id` including its associated Product data
router.get('/:id', async(req, res) => {
  try{
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product, through: ProductTag, as: 'tag_products'}]
    });

    if(!tagData){
      res.status(404).json({message: 'No tag found with this id!'});
      return;
    }
    res.status(200).json(tagData);
  }catch(err){
    json.stats(500).json(err);
  }
});

// create a new tag
router.post('/', (req, res) => {
  /* req.body:
    {
      tag_name: "cotton",
      productIds: [1, 2, 3, 4]
    }
  */
    Tag.create(req.body)
    .then((tag) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.productIds.length) {
        const tagProductIdArr = req.body.productIds.map((product_id) => {
          return {
            product_id,
            tag_id: tag.id
          };
        });
        return ProductTag.bulkCreate(tagProductIdArr);
      }
      // if no tag products, just respond
      res.status(200).json(tag);
    })
    .then((tagProductIds) => res.status(200).json(tagProductIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  // update product data
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
      // find all associated products from ProductTag
      return ProductTag.findAll({ where: { tag_id: req.params.id } });
    })
    .then((tagProducts) => {
      // get list of current product_ids
      const tagProductIds = tagProducts.map(({ product_id }) => product_id);
      // create filtered list of new product_ids
      const newTagProducts = req.body.productIds
        .filter((product_id) => !tagProductIds.includes(product_id))
        .map((product_id) => {
          return {
            product_id,
            tag_id: req.params.id,
          };
        });
      // figure out which ones to remove
      const tagProductsToRemove = tagProducts
        /*returns a new array of objects that do not have a product_id property 
        that is included in the req.body.productIds array */
        .filter(({ product_id }) => !req.body.productIds.includes(product_id))
        /*extracts only the id property from each object in the array and 
        returns a new array containing only these id values */
        .map(({ id }) => id);

      // run both actions
      /*takes an array of promises as an argument, and returns 
      a new promise that resolves when all of the promises in 
      the array have resolved. */
      return Promise.all([
        ProductTag.destroy({ where: { id: tagProductsToRemove } }),
        ProductTag.bulkCreate(newTagProducts),
      ]);
    })
    .then((updatedTagProducts) => res.json(updatedTagProducts))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

// delete on tag by its `id` value
router.delete('/:id', async(req, res) => {
  try{
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if(!tagData){
      res.status(404).json({message: 'No tag found with this id!'});
      return;
    }

    res.status(200).json(tagData);
  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
