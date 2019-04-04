/**
 * 0 Obter um uusario
 * 1 Obter o numero de telefone de um uusario a partir de seu id
 * 2 Obter o endereco do usuario pelo id
 */

const util = require("util");
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        id: 1,
        nome: "Snoop Dog",
        dataNascimento: new Date()
      });
      reject("Deu Ruim");
    }, 1000);
  });
}

function obterTelefone(id) {
  return new Promise((resolve, reject) => {
    setInterval(() => {
      return resolve({
        telefone: "1199002",
        ddd: 11
      });
    }, 2000);
  });
}

function obterEndereco(id, callback) {
  setInterval(() => {
    return callback(null, {
      rua: "dos bobos",
      numero: 0
    });
  }, 2000);
}

const demoPromisse = obterUsuario();

demoPromisse
  .then(usuario => {
    return obterTelefone(usuario.id).then(telefone => {
      return (user = {
        id: usuario.id,
        nome: usuario.nome,
        telefone: `(${telefone.ddd})${telefone.telefone}`
      });
    });
  })
  .then(usuario => {
    const endereco = obterEnderecoAsync(usuario.id);
    endereco.then((endereco) => {
      return console.log({
        nome: usuario.nome,
        telefone: usuario.telefone,
        endereco: `Rua: ${endereco.rua}, N: ${endereco.numero}`
      })  
    })
  })
  .catch(err => {
    console.error("Deu Ruim ", err);
  });
