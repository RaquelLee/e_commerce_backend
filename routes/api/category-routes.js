const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({include: [{ model: Product}]}
      );
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // finds one category by its `id` value, includes its associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}]
        //through: Table, as: 'params' 
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(
    req.body
      );
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//update category by id
router.put('/:id', (req, res) => {
  Category.update(req.body,
    {
      where: {
        id: req.params.id
      },
    }).then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => res.json(err));
});


//delete category by id
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      // //include as
      // include: [{ model: Product, as: "category_id"}],
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
