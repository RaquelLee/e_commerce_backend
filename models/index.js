// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
  //works, accidental constraint
})
// Categories have many Products
//one to many
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
})
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
  },
  as: 'products_tag',
})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
  },
  as: 'tags_product'

})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
