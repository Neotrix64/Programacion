const assert = require('assert');
const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');

describe('wikipedia', function() {
  this.timeout(30000);
  
  it('Deberia funcionar el boton de busqueda correctamente', async function() {
    let driver = await new Builder().forBrowser('firefox').build();
    try {
      await driver.get('https://es.wikipedia.org/wiki/Wikipedia:Portada');

      await driver.takeScreenshot().then(function(data) {
        fs.writeFileSync('imagenes/Historia4/paso1.png', data, 'base64');
      });
      
      await driver.wait(until.elementLocated(By.name('search')), 10000);
    
      const inputElement = await driver.findElement(By.name('search'));
      await inputElement.sendKeys('Republica Dominicana');

      
      

      await driver.takeScreenshot().then(function(data) {
        fs.writeFileSync('imagenes/Historia4/paso2.png', data, 'base64');
      });

      await driver.get('https://es.wikipedia.org/wiki/República_Dominicana');

      await driver.takeScreenshot().then(function(data) {
        fs.writeFileSync('imagenes/Historia4/paso3.png', data, 'base64');
      });

      
    } catch (error) {
      console.error('Error durante la busqueda de una pagina', error);
      throw error;
    } finally {
      await driver.quit();
    }
  });
});
