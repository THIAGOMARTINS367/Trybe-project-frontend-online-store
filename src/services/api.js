export async function getCategories() {
  const fetchCategories = await fetch('https://api.mercadolibre.com/sites/MLB/categories')
    .catch((erro) => erro);
  const data = fetchCategories.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  const fetchResult = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`)
    .then((element) => element.json())
    .then((dados) => dados)
    .catch((erro) => erro);
  return fetchResult;
}
