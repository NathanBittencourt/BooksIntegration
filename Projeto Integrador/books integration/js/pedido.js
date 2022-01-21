$( document ).ready( function(){

    // na div id sortable cria funcionalidade de ordenação
    $( "#sortable" ).sortable({

        placeholder: "ui-state-highlight",

        helper: "clone"

    });

    // ação de clique em um botão incluir / remover
    $(".btn-incluir-remover").click(function(){
        // se o item não foi inserido
        if ( $(this).attr("data-pedido") === "0" ) {
            $(this).attr("data-pedido", 1).html("Remover");
        } else {
            $(this).attr("data-pedido", 0).html("Incluir");
        }
    });

    // ação de clique do botão enviar pedido
    $(".btn-enviar-pedido").click(function(){

        // variável para armazenar os itens pedidos
        var pedido = "";

        // valor total do pedido
        var totalPedido = 0;

        // percorre todos os botões que existem na página
        $(".btn-incluir-remover").each(function(){
            // se o produto relacionado ao botão foi incluído
            if ( $(this).attr("data-pedido") === "1" ) {

                // armazena a quantidade pedida do produto
                var quantidade = parseInt( $(".quantidade[data-codigo-quantidade='" + $(this).attr("data-codigo") + "']").val() );

                // armazena o nome do produto
                var produto = $(this).attr("data-produto");

                // valor do item
                var valor = parseFloat( $(this).attr("data-valor") ).toFixed(2);

                // subtotal do item
                var subtotal = (quantidade * valor).toFixed(2);

                // soma total do pedido
                totalPedido += parseFloat(subtotal);

                // adiciona quantidade e produto ao pedido
                pedido += quantidade + " - " + produto + " x " + valor + " = " + subtotal + "<br>";
            }
        });

        // se o pedido estiver vazio
        if ( pedido === "" ) {
            $("#modal-pedido-msg").html( "Inclua ao menos um item para realizar o pedido" );
            $("#btn-confirmar-pedido").hide();
        } else {

            // concatena o valor total do pedido
            pedido += "Total do pedido: R$ " + totalPedido.toFixed(2) + "</b>";

            // inclui os itens pedidos no modal
            $("#modal-pedido-msg").html(pedido);
            $("#btn-confirmar-pedido").show();
        }

        $("#modal-pedido").modal("show");
    });

    // ação de clique no botão enviar pedido pelo whatsapp
    $("#btn-confirmar-pedido").click(function(){
        $(location).attr("href", "https://api.whatsapp.com/send?phone=+5532984462817&text=" 
            + encodeURI( "Olá gostaria de pedir\n" + $("#modal-pedido-msg").html().replace(/<br\s*\/?>/, "\n") ) );
    });
});