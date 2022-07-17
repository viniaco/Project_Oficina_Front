var CpfCli;

window.onload = function() {
    CpfCli = sessionStorage.getItem('cpf');

        consultarNotificacao(CpfCli);   
}

function postar() {
  var input_cpf = document.querySelector("#cpf");
  var Cpf = input_cpf.value;

  var input_cnh = document.querySelector("#cnh");
  var Cnh = input_cnh.value;

  var url =
    "https://localhost:44333/api/Login?Cpf=" + Cpf + "&Cnh=" + Cnh + "";

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", url, false);
  xhttp.send();

  console.log(xhttp.responseText);
}

function Verificar() {
  var input_cpf = document.querySelector("#cpf").value;
  console.log(input_cpf);
  var cpf = input_cpf;

  var input_cnh = document.querySelector("#cnh").value;
  console.log(input_cnh);
  var cnh = input_cnh;

  var url =
    "https://localhost:44333/api/Login?Cpf=" +
    input_cpf +
    "&Cnh=" +
    input_cnh;

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", url, false);
  xhttp.send();

  var valor = xhttp.responseText;

  console.log(valor);
  var json = JSON.parse(JSON.parse(valor));
  console.log(json);

  if (json["acesso"] == "INVALIDO") {
    document.getElementsById("status").values = "Sem Acesso";
  } else {
    window.location.replace("notificacoes.html");
    sessionStorage.setItem("cpf", cpf);
    sessionStorage.setItem("cnh", cnh);
  }
}

function consultarNotificacao(ClienteID) {
  console.log(ClienteID);
  var url = `https://localhost:44333/api/Rotina?ClienteID=` + ClienteID;
  console.log(url);
  var nome = "";

  var finalizada = "Finalizada";
  var Nfinalizada = "Não finalizada";

  $.get(url, (data) => {
    dados = JSON.parse(data);
    console.log(data);
    var div = "";

    $(dados).each(function (index) {
      if (nome != `${dados[index].nomeOS}`) {
       
        div += `<div><h3>Nome da ordem</h3><p>${dados[index].nomeOS}</p></div>`;
      }
      if (dados[index].Finalizada == "Sim") {
        div += `<div style="color:green"><h3>Status</h3><p>Finalizada</p></div>`;
        
      } else {
        div += `<div style="color:red"><h3>Status</h3><p>Não Finalizada</p></div>`;
        
      }
      nome = `${dados[index].nomeOS}`;
    });
    document.getElementById("notificacao").innerHTML = div;
  });
}
