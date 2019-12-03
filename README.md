# apt-search
Data science project to help identify apartment opportunities to buying in Brazil using data from Real Estate Auctions for discounted residential bank-owned and foreclosure home deals. Data collected from zukerman.com.br.

Para rodar por enquanto você precisa executar o comando:

```javascript
node apt-scraping.js
```

O resultado atualizado aparece na pasta scraping `SP_all.json` se você rodar o setup padrão da função `APTsearch()`

```javascript
APTsearch(url[3], filename[3]); //running all
```

Depois de rodar o processo, você precisa atualizar os dados no arquivo `points/interestpoints.json` para os pontos de interesse pessoais e com isto rodar o arquivo: `apt-scoring.js`:

```javascript
node apt-scoring.js
```

Isto vai gerar uma lista em order decrescente dos melhores lugares disponíveis com base na sua própria localização.
