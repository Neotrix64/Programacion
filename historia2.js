const assert = require('assert');
const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');

describe('wikipedia', function() {
  this.timeout(30000); 
  
  it('Debería acceder sin problemas a la pestaña aleatoria', async function() {
    let driver = await new Builder().forBrowser('firefox').build();
    try {
      await driver.get('https://es.wikipedia.org/wiki/Wikipedia:Portada');

      await driver.takeScreenshot().then(function(data) {
        fs.writeFileSync('imagenes/Historia2/paso1.png', data, 'base64');
      });
      
      await driver.wait(until.elementLocated(By.id('vector-main-menu-dropdown-checkbox')), 10000);
      const button = await driver.findElement(By.id('vector-main-menu-dropdown-checkbox'));
      await button.click();

      await driver.takeScreenshot().then(function(data) {
        fs.writeFileSync('imagenes/Historia2/paso2.png', data, 'base64');
      });

       
    await driver.wait(until.elementLocated(By.xpath('//*[@id="n-randompage"]/a')), 10000);
   
    const randomPageButton = await driver.findElement(By.xpath('//*[@id="n-randompage"]/a'));
    await randomPageButton.click();

    await driver.takeScreenshot().then(function(data) {
        fs.writeFileSync('imagenes/Historia2/paso3.png', data, 'base64');
      });

      
    } catch (error) {
      console.error('Error la busqueda de una pagina random', error);
      
      throw error;
    } finally {
      await driver.quit();
    }
  });
});
