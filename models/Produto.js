var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Model Produto
 * ==========
 */

var Produto = new keystone.List('Produto', {
  map: { name: 'produto' },
  autokey: { path: 'slug', from: 'produto', unique: true }
});

Produto.add({
  produto: { type: String, required: true },
  ativo: { type: Types.Boolean, initial: true, required: true },
  preco: { type: Types.Money, format: '$0.0,00', label: 'Valor do produto', },
  descricao: {
    breve: { type: Types.Textarea, height: 150, label: "Breve descrição" },
    completa: { type: Types.Html, wysiwyg: true, height: 200, label: "Descricao completa" }
  },
  criadoEm: { type: Types.Date, index: true, default: new Date() },
  detalhes: { type: Types.TextArray },
  imagens: { type: Types.CloudinaryImages }
  
});

Produto.schema.virtual('descricao.full').get(function() {
  return this.descricao.completa || this.descricao.breve;
});

Produto.defaultColumns = 'produto, ativo, preco, criadoEm';
Produto.register();
