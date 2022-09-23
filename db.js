const fs = require("fs");

class baseDeDatos {
  // * solo se invoca cuando se crea instancia

  constructor(archivo) {
    this.archivo = archivo;
  }

 
  //cargar producto
  async createProduct(objProduct) {
    const data = await fs.promises.readFile(
      `${this.archivo}/productos.json`,
      "utf-8"
    );
    const productos = JSON.parse(data);
    const id = productos.length + 1;
    objProduct.id = id;
    productos.push(objProduct);
    const productosString = JSON.stringify(productos);
    await fs.promises.writeFile(
      `${this.archivo}/productos.json`,
      productosString
    );

    return productos;
  }


  //* obtener todos los productos
  async getAllProducts() {
    try {
      const data = await fs.promises.readFile(
        `${this.archivo}/productos.json`,
        "utf-8"
      );
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }


}

async function start() {
  const db = new baseDeDatos("data");
  await db.createUser({ nombre: "Javier", correo: "jakummer@gmail.com" });

}
module.exports = baseDeDatos;
