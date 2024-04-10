const assert = require('assert');
const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');

describe('wikipedia', function() {
  this.timeout(30000);
  
  it('Debería iniciar sesion correctamente', async function() {
    let driver = await new Builder().forBrowser('firefox').build();
    try {
      await driver.get('https://es.wikipedia.org/wiki/Wikipedia:Portada');

      await driver.takeScreenshot().then(function(data) {
        fs.writeFileSync('imagenes/Historia5/paso1.png', data, 'base64');
      });
      
      await driver.wait(until.elementLocated(By.xpath('//*[@id="pt-login-2"]/a/span')), 10000);
      const button = await driver.findElement(By.xpath('//*[@id="pt-login-2"]/a/span'));
      await button.click();

      await driver.get('https://es.wikipedia.org/w/index.php?title=Especial:Entrar&returnto=Wikipedia%3APortada');

      await driver.takeScreenshot().then(function(data) {
        fs.writeFileSync('imagenes/Historia5/paso2.png', data, 'base64');
      });

      await driver.wait(until.elementLocated(By.name('wpName')), 10000);

      const inputElement = await driver.findElement(By.name('wpName'));
      await inputElement.sendKeys('Gusv064');

      await driver.takeScreenshot().then(function(data) {
        fs.writeFileSync('imagenes/Historia5/paso3.png', data, 'base64');
      });

      await driver.wait(until.elementLocated(By.name('wpPassword')), 10000);

      const inputElement2 = await driver.findElement(By.name('wpPassword'));
      await inputElement2.sendKeys('redojoredojo');

      await driver.takeScreenshot().then(function(data) {
        fs.writeFileSync('imagenes/Historia5/paso4.png', data, 'base64');
      });

      await driver.wait(until.elementLocated(By.name('wploginattempt')), 10000);
      const button2 = await driver.findElement(By.name('wploginattempt'));
      await button2.click();

      await driver.get('https://es.wikipedia.org/wiki/Wikipedia:Portada');

      await driver.takeScreenshot().then(function(data) {
        fs.writeFileSync('imagenes/Historia5/paso5.png', data, 'base64');
      });

      
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);

      throw error;
    } finally {
      await driver.quit();
    }
  });
});

