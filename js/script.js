function mostrarNotificacao(mensagem, cor = "#f44336") {
  const notificacao = document.getElementById("notificacao");
  notificacao.textContent = mensagem;
  notificacao.style.backgroundColor = cor;
  notificacao.classList.add("show");

  setTimeout(() => {
    notificacao.classList.remove("show");
  }, 3000);
}

function gerarCupom() {
  const nome = document.getElementById("nome").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const endereco = document.getElementById("endereco").value.trim();
  const observacao = document.getElementById("observacao").value.trim();
  const data = document.getElementById("data").value;
  const statusPagamento = document.getElementById("statusPagamento").value;
  const metodoPagamento = document.getElementById("metodoPagamento").value;
  const valorTotal = document.getElementById("valorTotal").value;

  if (
    !nome ||
    !telefone ||
    !endereco ||
    !data ||
    !statusPagamento ||
    !metodoPagamento ||
    !valorTotal
  ) {
    mostrarNotificacao("Por favor, preencha todos os campos obrigatórios!");
    return;
  }

  const [ano, mes, dia] = data.split("-");
  const dataCorrigida = new Date(ano, mes - 1, dia);
  const dataFormatada = dataCorrigida.toLocaleDateString("pt-BR");
  const horaAtual = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const valorTotalFormatado = Number.parseFloat(valorTotal).toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  );

  const cupomContent = `
    <div class="cupom-content">
      <div style="text-align: center;">
        <div style="height: 30px;"></div>
        <h2 style="margin: 0;">🏍️ Sua Entrega Chegou</h2>
        <small>${dataFormatada} - ${horaAtual}</small>
      </div>
      <hr>
      <p><strong>Cliente:</strong> ${nome}</p>
      <p><strong>Telefone:</strong> ${telefone}</p>
      <p><strong>Endereço:</strong> ${endereco}</p>
      <p><strong>Observação:</strong> ${observacao || "Nenhuma"}</p>
      <p><strong>Pagamento:</strong> ${statusPagamento} - ${metodoPagamento}</p>
      <p><strong>Valor Total:</strong> ${valorTotalFormatado}</p>
      <hr>
      <div style="text-align: center;">
        <p><strong>✅ Obrigado pela preferência!</strong></p>
      </div>
    </div>
  `;

  document.getElementById("cupomPreview").innerHTML = cupomContent;
  mostrarNotificacao("Cupom gerado com sucesso!", "#28a745");
}

function imprimirCupom() {
  const cupomContent = document.getElementById("cupomPreview").innerHTML;
  const tamanhoCupom = document.getElementById("tamanhoCupom").value;

  if (!cupomContent) {
    mostrarNotificacao("Por favor, gere um cupom antes de tentar imprimir.");
    return;
  }

  const larguraCupom = tamanhoCupom === "58mm" ? "48mm" : "72mm";

  const printWindow = window.open("", "_blank", "width=600,height=600");

  printWindow.document.write(`
    <html>
      <head>
        <title>Impressão de Cupom - Nexus Entregas</title>
        <style>
          body { font-family: "Courier New", Courier, monospace; margin: 0; padding: 10px; }
          .cupom-content { width: ${larguraCupom}; margin: 0 auto; font-size: 15px; line-height: 1.4; }
          h2 { font-size: 16px; margin-bottom: 5px; }
          p { margin: 3px 0; word-wrap: break-word; }
          small { font-size: 13px; display: block; margin-bottom: 5px; }
          hr { border: none; border-top: 1px dashed #000; margin: 5px 0; }
          strong { font-weight: bold; }
          .footer { margin-top: 10px; text-align: center; font-size: 11px; }
        </style>
      </head>
      <body onload="window.print(); window.onafterprint = window.close;">
        <div class="cupom-content">
          ${cupomContent}
        </div>
      </body>
    </html>
  `);

  printWindow.document.close();
}

function limparCampos() {
  document.getElementById("nome").value = "";
  document.getElementById("telefone").value = "";
  document.getElementById("endereco").value = "";
  document.getElementById("observacao").value = "";
  document.getElementById("data").value = "";
  document.getElementById("statusPagamento").value = "Pago";
  document.getElementById("metodoPagamento").value = "Cartão";
  document.getElementById("valorTotal").value = "";
  document.getElementById("tamanhoCupom").value = "58mm";
  document.getElementById("cupomPreview").innerHTML = "";
  mostrarNotificacao("Todos os campos foram limpos!", "#17a2b8");
}
