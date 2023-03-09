sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("googleimagens.controller.Inicial", {
            onInit: function () {
                // COLCHETE INDICA QUE VARIAVEL É DO TIPO TABELA INTERNA DO ABAP
                let ImageList = {
                    Imagens: []
                };

                //CRIAÇÃO DO MODELO PARA EXIBIR DADOS NA TELA
                let ImageModel = new JSONModel(ImageList);
                let view = this.getView();
                view.setModel(ImageModel, "ModeloImagem");

            },
            onPressBuscar: function () {
                let inputBusca = this.byId("inpBusca");
                let query = inputBusca.getValue();
               // alert(query);

               const settings = {
                "async": true,
                "crossDomain": true,
                //concatenate
                "url": "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=" + query + "&pageNumber=1&pageSize=10&autoCorrect=true",
                "method": "GET",
                "headers": {
                    "X-RapidAPI-Key": "61b7860a3amshd1eb8618ba8acffp13b9b7jsn9ae4e5d96a35",
                    "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
                }
            };
            // parentesis serve para passar parametros
            // callback: uma função executada no final de outra função
            $.ajax(settings).done(function (response) {
                console.log(response);

                //instanciar o modelo
                let oImageModel = this.getView().getModel("ModeloImagem");
                let oDadosImage = oImageModel.getData();

                //clear tabela interna = array
                oDadosImage.Imagens = [];

              //loop que adiciona dados de uma tabela em outra tabela
             let listaResultados = response.value;
             let newItem;

             //vamos ao loop = for

             for (var i = 0; i < listaResultados.length; i++){
                //read table pelo indice
                newItem = listaResultados[i];
                //append dos dados na nova tabela 
                oDadosImage.Imagens.push(newItem);
             }

             oImageModel.refresh();

            }.bind(this)
            );
            }

        });
    });

