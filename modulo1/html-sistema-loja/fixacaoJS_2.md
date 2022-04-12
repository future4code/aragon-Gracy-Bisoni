```
function calculaPrecoTotal(quantidade) {
  let preco = 0
  if (quantidade < 12){
    preco = preco + (quantidade * 1.30)
  } else if (quantidade >= 12){
    preco = preco + quantidade
  }
  return preco
}
```