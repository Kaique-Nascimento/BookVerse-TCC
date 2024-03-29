function handleCheckboxChange(checkbox, data) {
    var dataFalecimentoInput = document.getElementById("data_falecimento_editada");
    var mensagemFalecimento = document.getElementById('mensagemFalecimento');
  
    if (checkbox.checked) {
      dataFalecimentoInput.value = "0000";
      dataFalecimentoInput.disabled = true;
      dataFalecimentoInput.style.color = "gray";
      mensagemFalecimento.style.display = "none";
    } else {
      dataFalecimentoInput.disabled = false;
      dataFalecimentoInput.value = data;
      dataFalecimentoInput.style.color = "";
      mensagemFalecimento.style.display = ""; 
    }
  }    
  
                    function passaTela(){
                var pesquisa = document.getElementById('pesquisa').value;
  window.location.href="livros.html?pesquisa="+pesquisa;            
  }
                          function escondeLogin() {
                            var escondidos =
                              document.getElementsByClassName("escondido");
                            for (var i = 0; i < escondidos.length; ++i) {
                              escondidos[i].style.display = "none";
                            }
                          }
                          function mostraLogin() {
                            var escondidos =
                              document.getElementsByClassName("escondido");
                            for (var i = 0; i < escondidos.length; ++i) {
                              escondidos[i].style.display = "block";
                            }
                          }
                          const imagem = document.querySelector("#arquivo");
                          const texto = document.querySelector("#fileMessage");
                          imagem.addEventListener("change", (event) => {
                            const imagem_preview =
                              document.querySelector("#preview");
                            if (imagem_preview) {
                              imagem_preview.remove();
                            }
                            const preview = document.createElement("img");
                            const reader = new FileReader();
                            reader.onload = function (event) {
                              preview.width = 110;
                              preview.height = 100;
                              preview.id = "preview";
                              preview.src = event.target.result;
                              texto.insertAdjacentElement("afterend", preview);
                            };
                            reader.readAsDataURL(imagem.files[0]);
                          });
                          let lastKeyWasSpace = false;
                          function handleKeyDown(event) {
                            if (event.key === 'Enter') {
                              event.preventDefault();
                            } else if (event.key === ' ') {
                              if (lastKeyWasSpace) {
                                event.preventDefault();
                              }
                              lastKeyWasSpace = true;
                            } else {
                              lastKeyWasSpace = false;
                            }
                          }
                          
                          function handlePaste(e) {
                            e.preventDefault();
                            var text = (e.originalEvent || e).clipboardData.getData('text/plain');
                            text = text.replace(/\r?\n/g, ' '); 
                            text = text.replace(/\s+/g, ' '); 
                            document.execCommand('insertText', false, text);
                            lastKeyWasSpace = false;
                          }
                                   const readOnlyOptions = document.querySelectorAll(".read-only");
                          
                          readOnlyOptions.forEach((option) => {
                            option.disabled = true;
                          });
                                          var logado = "";
                                          function cadastroLivro() {
                                            const formData = new FormData();
                                            var livro = document.querySelector("#nome_livro").value;
                                            var editora = document.querySelector("#nome_editora").value;
                                            var publicacao = document.querySelector("#data_publicacao").value;
                                            var sinopse = document.querySelector("#sinopse").value;
                          
                                            var categoria = document.getElementById("option_categoria");
                                            var valor_categoria =
                                              categoria.options[categoria.selectedIndex].value;
                          
                                            var periodo = document.getElementById("select_periodo");
                                            var valor_periodo = periodo.options[periodo.selectedIndex].value;
                          
                                            var classificacao = document.getElementById("select_classificacao");
                                            var valor_classificacao =
                                              classificacao.options[classificacao.selectedIndex].value;
                                              var sala = document.getElementById("select_sala");
                                  var valor_sala = sala.options[sala.selectedIndex].value;
                                            formData.append("livro", livro);
                                            formData.append("editora", editora);
                                            formData.append("publicacao", publicacao);
                                            formData.append("sinopse", sinopse);
                                            formData.append("autor", nomezinho);
                                            formData.append("categoria", valor_categoria);
                                            formData.append("periodo", valor_periodo);
                                            formData.append("classificacao", valor_classificacao);
                                            formData.append("sala", valor_sala);
                          
                                            var url = "";
                          
                                            if (livro &&
                                            editora &&
                                            publicacao &&
                                            sinopse) {
                                              url = `php/livros/livro_cadastro.php`;
                                              fetch(url, {
                                              method: "POST",
                                              body: formData,
                                            })
                                              .then((response) => response.json())
                                              .then((data) => {
                                                console.log(data);
                                                alert(data.mensagem);
                                                carregarAutores();
                                                carregarLivroAutor();
                                              })
                                              .catch((error) => {
                                                console.error("Erro na requisição fetch:", error);
                                              });
                                          }
                                          else {
                                              alert("Digite todas as informações");
                                              modalLivro();
                                              } 
                                            }
                                          var nomezinho = "";
                                          window.addEventListener("load", (event) => {
                                            logado = sessionStorage.getItem("logado");
                                            var login = document.querySelector('#logadinho');
                                    if(logado == "sim"){
                                      mostraLogin();
                                      login.style.display = 'none';
                                    }
                                    else{
                                      escondeLogin();
                                      login.style.display = 'block';
                                    }
                                            carregarAutores();
                                            carregarLivroAutor();
                                            optionCategorias();
                                            optionPeriodo();
                                          });
                                          function sair() {
                                            if (confirm("Tem certeza que deseja sair da conta?")) {
                                              sessionStorage.clear();
                                              location.reload();
                                              sessionStorage.setItem("logado", "nao");
                                            }
                                          }
                                          function apagarConta() {
                                            var rm = sessionStorage.getItem("rm");
                                            var url = "php/usuarios/usuario_excluir.php?codigo=" + rm;
                                            if (confirm("Deseja apagar essa conta?" + rm)) {
                                              fetch(url)
                                                .then((response) => response.json())
                                                .then((data) => {
                                                  sessionStorage.clear();
                                                  location.reload();
                                                  sessionStorage.setItem("logado", "nao");
                                                });
                                            }
                                          }
                                          function modalEmail() {
                                            document.getElementById("email");
                                            var myModal = new bootstrap.Modal(
                                              document.getElementById("email_modal")
                                            );
                                            myModal.show();
                                            nome = sessionStorage.getItem("nome");
                                            email = sessionStorage.getItem("email");
                                            rm = sessionStorage.getItem("rm");
                                            var email_atualizado = (document.getElementById(
                                              "email_atualizado"
                                            ).value = email);
                                            var nome_atualizado = (document.getElementById(
                                              "nome_atualizado"
                                            ).value = nome);
                                            var codigo_cara = (document.getElementById("codigo_cara").value = rm);
                                          }
                                          function atualizaEmail() {
                                            var email = document.getElementById("email_atualizado").value;
                                            var nome = document.getElementById("nome_atualizado").value;
                                            var rm = document.getElementById("codigo_cara").value;
                                            var emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                            if (
                                              email.match(emailFormat) &&
                                              nome != null &&
                                              nome != "" &&
                                              email != null &&
                                              email != ""
                                            ) {
                                              url = `php/usuarios/usuario_editar.php?nome=${nome}&email=${email}&rm=${rm}`;
                                              fetch(url)
                                                .then((response) => response.json())
                                                .then((data) => {
                                                  console.log(data);
                                                  alert(data.mensagem);
                                                  sessionStorage.setItem("nome", nome);
                                                  sessionStorage.setItem("email", email);
                                                });
                                            } else {
                                              alert("Preencha todos os campos!");
                                            }
                                          }
                                          function modalPeriodo() {
                                            document.getElementById("Livrooss");
                          
                                            var myModal = new bootstrap.Modal(
                                              document.getElementById("periodo_modal")
                                            );
                                            myModal.show();
                                          }
                                          function modalCategoria() {
                                            document.getElementById("categoria");
                                            var myModal = new bootstrap.Modal(
                                              document.getElementById("categoria_modal")
                                            );
                                            myModal.show();
                                          }
                          
                                          function modalLivro() {
                                            var autor = document.getElementById("nome_autor");
                                            autor.disabled = true;
                                            autor.style.color = "gray";
                                            autor.value = nomezinho;
                                            var myModal = new bootstrap.Modal(
                                              document.getElementById("livro_modal")
                                            );
                                            myModal.show();
                                          }
                                          function cadCategoria() {
                                            var categoria = document.querySelector("#nome_categoria").value;
                                            var url = "";
                                            if (categoria == null || categoria == "") {
                                              alert("Digita tudo");
                                            } else {
                                              url = `php/categorias/categoria_cadastro.php?nome=${categoria}`;
                                              alert(`Categoria: ${categoria}\n cadastrada com Sucesso!`);
                                              categoria.value = null;
                                            }
                                            fetch(url)
                                              .then((response) => response.json())
                          
                                              .then((data) => {
                                                console.log(data);
                                                alert(data.mensagem);
                                                carregarCategorias();
                                              });
                                          }
                                          function cadPeriodo() {
                                            var periodo = document.querySelector("#periodo_nome").value;
                                            var inicio = document.querySelector("#inicio_periodo").value;
                                            var fim = document.querySelector("#fim_periodo").value;
                                            var url = "";
                                            if (periodo != null && periodo != "") {
                                              url = `php/periodos/periodo_cadastro.php?nome=${periodo}&inicio=${inicio}&fim=${fim}`;
                                              alert(`Categoria: ${periodo}\n cadastrada com Sucesso!`);
                                              periodo.value = null;
                                            } else {
                                              alert("Digite todas as informações");
                                            }
                                            fetch(url)
                                              .then((response) => response.json())
                                              .then((data) => {
                                                console.log(data);
                                                alert(data.mensagem);
                                                carregaPeriodos();
                                              });
                                          }
                                          function modalImagem() {
                                            var myModal = new bootstrap.Modal(
                                              document.getElementById("imagem_modal")
                                            );
                                            myModal.show();
                                          }
                                          var linkTema = document.getElementById("css-tema");
                                          var icone = document.getElementById("icone-tema");
                                          var img = document.getElementById("img-tema");
                                          var temaClaro = "css/css.css";
                                          var temaEscuro = "css/escuro.css";
                          
                                          function mudarParaClaro() {
                                            sessionStorage.setItem("tema", "claro");
                                            linkTema.href = "css/css.css";
                                            icone.className = "fa-solid fa-2x fa-sun";
                                            img.src = "img/logo/claro.png";
                                          }
                          
                                          function mudarParaEscuro() {
                                            sessionStorage.setItem("tema", "escuro");
                                            linkTema.href = "css/escuro.css";
                                            icone.className = "fa-solid fa-2x fa-moon";
                                            img.src = "img/logo/escuro.png";
                                          }
                          
                                          icone.addEventListener("click", function () {
                                            if (tema.checked) {
                                              tema.checked = false;
                                              mudarParaEscuro();
                                            } else {
                                              tema.checked = true;
                                              mudarParaClaro();
                                            }
                                          });
                          
                                          if (sessionStorage.getItem("tema") === "escuro") {
                                            mudarParaEscuro();
                                          } else {
                                            mudarParaClaro();
                                          }
                          
                                          document.addEventListener("DOMContentLoaded", function () {
                                            const fileInput = document.querySelector(
                                              '.custom-file-upload input[type="file"]'
                                            );
                                            const fileMessage = document.querySelector(".file-message");
                                            var cadastro = document.querySelector("#cad_foto");
                          
                                            function handleFileChange() {
                                              if (fileInput.files.length > 0) {
                                                const fileName = fileInput.files[0].name;
                                                const fileExtension = fileName.split(".").pop().toLowerCase();
                                                const allowedExtensions = ["jpg", "jpeg", "png", "jfif"];
                          
                                                if (allowedExtensions.includes(fileExtension)) {
                                                  fileMessage.innerHTML = `Imagem "${fileName}" enviada com sucesso!`;
                                                  fileMessage.style.color = "green";
                                                  cadastro.style.display="block";
                          
                                                } else {
                                                  fileMessage.innerHTML =
                                                    "Apenas imagens (jpg, jpeg, png, jfif) são permitidas.";
                                                  fileMessage.style.color = "red";
                                                  fileInput.value = "";
                                                  cadastro.style.display="none";
                                                }
                          
                                                fileMessage.style.display = "block";
                                              } else {
                                                fileMessage.style.display = "none";
                                              }
                                            }
                          
                                            fileInput.addEventListener("change", handleFileChange);
                                          });
                          
                                          function limitarCaracteres(elemento, maxCaracteres, elementoMensagem) {
                                            var texto = "Limite de caracteres excedido.";
                                            if (elemento.value.length > maxCaracteres) {
                                              elemento.value = elemento.value.substring(0, maxCaracteres);
                                              document.getElementById(elementoMensagem).textContent =
                                                "Limite de caracteres excedido.";
                                            } else {
                                              document.getElementById(elementoMensagem).textContent = "";
                                            }
                                          }
                                          function optionPeriodo() {
                                            var url = "php/periodos/periodo.php";
                          
                                            fetch(url)
                                              .then((response) => response.json())
                                              .then((data) => {
                                                console.log(data);
                                                var options = "";
                                                for (let item in data) {
                                                  options += `
                                  <option value="${data[item].tb05_nome_periodo}" name="${data[item].tb05_nome_periodo}">${data[item].tb05_nome_periodo}</option>`; 
                                                }
                          
                                                var selectElement = (document.querySelector(
                                                  "#select_periodo"
                                                ).innerHTML = options);
                                              });
                                          }
                                          function checkInput(element) {
                                            if (element.value.trim() !== "") {
                                              element.classList.add("has-text");
                                            } else {
                                              element.classList.remove("has-text");
                                            }
                                          }
                                          function carregarAutores() {
                                            var queryString = window.location.search;
                                            const urlParams = new URLSearchParams(queryString);
                                            var codigo = urlParams.get("codigo");
                                            var categoria = urlParams.get("categoria");
                                            var periodo = urlParams.get("periodo");
                                            var url = `php/autores/autor_selecionado.php?codigo=${codigo}`;
                                            var informacoes = "";
                                            document.getElementsByName("codigo_autor").value = codigo;
                          
                                            fetch(url)
                                              .then((response) => response.json())
                                              .then((data) => {
                                                console.log(data);
                          
                                                for (let item in data) {
                                                  var a = `${data[item].tb03_obito}`;
                                                  if (a === "0000") {
                                                    a = "Vivo";
                                                  }
                                                  nomezinho = `${data[item].tb03_nome_autor}`;
                          
                                                  if (logado == "sim") {
                                                    informacoes += `
                                                 <div class="row">
                                            <div class="col-md-3">
                                              <h3 class="titulo" style="white-space: nowrap; text-align:center; width:40px; margin-left:149%; margin-top:30%; word-break: break-all"> ${data[item].tb03_nome_autor}
                                                <br><input type="text" id="nome_autor_editado"
                                                onkeydown="handleKeyDown(event)"
                            onpaste="handlePaste(event)"
                                                oninput="limitarCaracteres(this, 100, 'mensagemAutor')">
                                  </h3>
                          
                                  <div id="mensagemAutor" style="color: red;"></div>
                                              <img src="img/autores/${data[item].tb03_foto}" style="width:300px; height:300px; border-radius: 100%; object-fit: cover;margin-top:-30px" alt="${data[item].tb03_nome_autor}">
                                              <div class="d-flex flex-column align-items-center" style="margin-left:30%">
                                                  <a href="#" onclick="editarFoto(${data[item].tb03_id_autor})"class="icone"><br>
                                      <i class="fa-solid fa-2x fa-image"></i></a>
                          
                                              </div>
                                          </div>
                          
                                              <div class="col-md-9 biografia" style="margin-top: 7%; padding-left: 10%;">
                                                <div class="row">
                            <div class="col-md-6">        
                              <button class="btniconedt">
                                <a href="#" onclick="mostraCampo('${data[item].tb03_nome_autor}', ${data[item].tb03_id_autor},
                                '${data[item].tb03_nacionalidade}', '${data[item].tb03_nascimento}', '${data[item].tb03_obito}',
                                '${data[item].tb03_biografia}','${data[item].tb04_nome_categoria}','${data[item].tb05_nome_periodo}')" class="icone">
                                  <i class="fas fa-edit fa-2x icone edt" style="cursor: pointer"></i>
                                </a>
                              </button>
                            </div>
                            <div class="col-md-6">
                              <button class="btnicon">
                                <a href="#" onclick="apagarAutor(${data[item].tb03_id_autor}, '${data[item].tb03_nome_autor}')" class="icone">
                                  <i class="fa-solid fa-2x fa-trash" style="color: #ed0c0c;"></i>
                                </a>
                              </button>
                            </div>
                          </div>
                          
                          
                                                  <i class="fa-solid fa-calendar-days" style="color: #0c65a0;">&nbsp ${data[item].tb03_nascimento} - ${a} &nbsp</i>
                                                  <br>
                                                  <span id="campos_nascimento_falecimento">
                            <div class="row">
                              <div class="col-3">
                                <input type="text"
                                onkeydown="handleKeyDown(event)"
                            onpaste="handlePaste(event)"
                                       id="data_nascimento_editada"
                                       oninput="this.value = this.value.replace(/[^0-9]/g, '').substring(0, 5); limitarCaracteres(this, 4, 'mensagemNascimento');">
                                       <div id="mensagemNascimento" style="color: red;"></div>
                          
                                       </div>
                                       
                              <div class="col-3" style="margin-left:3%">
                                <input type="text"
                                onkeydown="handleKeyDown(event)"
                            onpaste="handlePaste(event)"
                                       id="data_falecimento_editada"
                                       oninput="this.value = this.value.replace(/[^0-9]/g, '').substring(0, 5); limitarCaracteres(this, 4, 'mensagemFalecimento');">
                                       <div id="mensagemFalecimento" style="color: red;"></div>
                          
                                       </div>
                              <div class="col-3" style="margin-left:3%">
                                <label for="vivo">Vivo</label>
                                <input
                                  type="checkbox"
                                  id="vivo"
                                  onchange="handleCheckboxChange(this, '${data[item].tb03_obito}')"
                                />
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-3">
                                <div id="mensagemNascimento" style="color: red;"></div>
                              </div>
                              <div class="col-3">
                                <div id="mensagemFalecimento" style="color: red;"></div>
                              </div>
                            </div>
                          </span>
                          
                                                  <br>
                                                  <i class="fa-solid fa-location-dot" style="color: #0c65a0; ">&nbsp  ${data[item].tb03_nacionalidade}</i>
                                                  <br> <input type="text" id="nacionalidade_editada"
                                                  onkeydown="handleKeyDown(event)"
                            onpaste="handlePaste(event)"
                                                  oninput="limitarCaracteres(this, 50, 'mensagemNacionalidade');">
                          
                                                  <br>
                                                  <div id="mensagemNacionalidade" style="color: red"></div>
                          
                                                  <br>
                                                  <br>
                          
                                                <h3 class="titulo_bio" style="font-size: 25px">Biografia &nbsp
                                    <h5 class="bio" style="font-size: 20px; word-break: break-all">
                                      ${data[item].tb03_biografia}
                                      <br>
                                      <textarea
                                    rows="5"
                                    cols="40"
                                    id="biografia_editada"
                                    oninput="limitarCaracteres(this, 800,'mensagemBiografia')"
                                    onkeydown="handleKeyDown(event)"
                            onpaste="handlePaste(event)"
                                  ></textarea>
                                  <div id="mensagemBiografia" style="color: red;"></div>
                                    </h5>
                                   <div class="row">
                                    <div class="col-md-6">
                                      <h3 class="titulo_bio"> Categoria </h3>
                                      <h5> ${data[item].tb04_nome_categoria}
                                        <select name="select" id="select_categoria_editada">
                          
                                  </select><br>
                                  <a href="#" onclick="modalCategoria()">
                                                            <button id="botao_categoria_editada" class="btn btn-primary cadastro" style="color: white">
                                                              Cadastrar nova categoria
                                                            </button>
                                                          </a>
                                  </h5>
                                      </div>
                                      <div class="col-md-6">
                                        <h3 class="titulo_bio"> Período </h3>
                                        <h5> ${data[item].tb05_nome_periodo}
                                          <select name="select" id="select_periodo_editado">
                          
                                  </select><br>
                                  <a href="#" onclick="modalPeriodo()">
                                    <button id="botao_periodo_editado" class="btn btn-primary cadastro" style="color: white">
                                                              Cadastrar novo período
                                                            </button>
                                                          </a>
                                  </h5>
                          
                                        </div>
                                        </div>
                                        <input type="hidden" name="codigo_autor" id="codigo_autor">
                                              </div>
                                             </div>
                                              <div class="row">
                                              
                                        <div class="col-6">
                                          <br> <br>
                                      <center>
                                        <button class="btn btn-primary" onclick="editarAutor(${data[item].tb03_id_autor})" id="botao_editar"style="margin-left:70%;color:white"> Atualizar </button></div>
                                        <div class="col-6">
                                          <br> <br>
                                        <button class="btn btn-primary"                   
                                        onclick="someCampos()" id="botao_cancelar"style="color:white"> Cancelar </button>
                                        </div>
                                        </center>
                                        </div>
                                      </div>
                                      <input type="hidden" name="codigo_livro" id="codigo_livro">
                                      <br> <br>
                                     
                                              `;
                                                  } else {
                                                    informacoes += `
                                                    <div class="row">
                                            <div class="col-md-3">
                                              <h3 class="titulo" style="white-space: nowrap; text-align:center; width:40px; margin-left:149%; margin-top:30%;word-break: break-all"> ${data[item].tb03_nome_autor}
                                                <br><input type="text" id="nome_autor_editado"
                                                onkeydown="handleKeyDown(event)"
                            onpaste="handlePaste(event)"
                                                oninput="limitarCaracteres(this, 100, 'mensagemAutor')">
                                  </h3>
                          
                                  <div id="mensagemAutor" style="color: red;"></div>
                                              <img src="img/autores/${data[item].tb03_foto}" style="width:300px; height:300px; border-radius: 100%; object-fit: cover;margin-top:-30px" alt="${data[item].tb03_nome_autor}">
                                              <div class="d-flex flex-column align-items-center">
                                                  <a href="#" onclick="editarFoto(${data[item].tb03_id_autor})"class="icone escondido"><br>
                                      <i class="fa-solid fa-2x fa-image"></i></a>
                          
                                              </div>
                                          </div>
                          
                                             <div class="col-md-9 biografia" style="margin-top: 11%; padding-left: 10%;">
                          
                          
                          
                                                  <i class="fa-solid fa-calendar-days" style="color: #0c65a0;">&nbsp ${data[item].tb03_nascimento} - ${a} &nbsp</i>
                                                  <br>
                                                  <span id="campos_nascimento_falecimento">
                            <div class="row">
                              <div class="col-3">
                                <input type="text"
                                onkeydown="handleKeyDown(event)"
                            onpaste="handlePaste(event)"
                                       id="data_nascimento_editada"
                                       oninput="this.value = this.value.replace(/[^0-9]/g, '').substring(0, 5); limitarCaracteres(this, 4, 'mensagemNascimento');">
                                       <div id="mensagemNascimento" style="color: red;"></div>
                          
                                       </div>
                              <div class="col-3">
                                <input type="text"
                                onkeydown="handleKeyDown(event)"
                            onpaste="handlePaste(event)"
                                       id="data_falecimento_editada"
                                       oninput="this.value = this.value.replace(/[^0-9]/g, '').substring(0, 5); limitarCaracteres(this, 4, 'mensagemFalecimento');">
                                       <div id="mensagemFalecimento" style="color: red;"></div>
                          
                                       </div>
                              <div class="col-3">
                                <label for="vivo">Vivo</label>
                                <input
                                  type="checkbox"
                                  id="vivo"
                                  onchange="handleCheckboxChange(this, '${data[item].tb03_obito}')"
                                />
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-3">
                                <div id="mensagemNascimento" style="color: red;"></div>
                              </div>
                              <div class="col-3">
                                <div id="mensagemFalecimento" style="color: red;"></div>
                              </div>
                            </div>
                          </span>
                          
                                                  <br>
                                                  <i class="fa-solid fa-location-dot" style="color: #0c65a0; ">&nbsp  ${data[item].tb03_nacionalidade}</i>
                                                  <br> <input type="text" id="nacionalidade_editada"
                                                  onkeydown="handleKeyDown(event)"
                            onpaste="handlePaste(event)"
                                                  oninput="limitarCaracteres(this, 50, 'mensagemNacionalidade');">
                          
                                                  <br>
                                                  <div id="mensagemNacionalidade" style="color: red"></div>
                          
                                                  <br>
                                                  <br>
                          
                                                <h3 class="titulo_bio" style="font-size: 25px">Biografia &nbsp
                                                  <h5 class="bio" style="font-size: 20px; word-break: break-all">
                                      ${data[item].tb03_biografia}
                          
                                      <br>
                                      <textarea
                                    rows="5"
                                    cols="40"
                                    id="biografia_editada"
                                    onkeydown="handleKeyDown(event)"
                            onpaste="handlePaste(event)"
                                    oninput="limitarCaracteres(this, 800,'mensagemBiografia')"
                                  ></textarea>
                                  <div id="mensagemBiografia" style="color: red;"></div>
                                    </h5>
                                   <div class="row">
                                    <div class="col-md-6">
                                      <h3 class="titulo_bio"> Categoria </h3>
                                      <h5> ${data[item].tb04_nome_categoria}
                                        <select name="select" id="select_categoria_editada">
                          
                                  </select><br>
                                  <a href="#" onclick="modalCategoria()">
                                                            <button id="botao_categoria_editada" class="btn btn-primary cadastro" style="color: white">
                                                              Cadastrar nova categoria
                                                            </button>
                                                          </a>
                                  </h5>
                                      </div>
                                      <div class="col-md-6">
                                        <h3 class="titulo_bio"> Período </h3>
                                        <h5> ${data[item].tb05_nome_periodo}
                                          <select name="select" id="select_periodo_editado">
                          
                                  </select><br>
                                  <a href="#" onclick="modalPeriodo()">
                                    <button id="botao_periodo_editado" class="btn btn-primary cadastro" style="color: white">
                                                              Cadastrar novo período
                                                            </button>
                                                          </a>
                                  </h5>
                          
                                        </div>
                                        </div>
                                        <input type="hidden" name="codigo_autor" id="codigo_autor">
                                              </div>
                                             
                                              <div class="row">
                                              
                                        <div class="col-6">
                                          <br> <br>
                                      <center>
                                        <button class="btn btn-primary" onclick="editarLivro()" id="botao_editar"style="margin-left:70%;color:white"> Atualizar </button></div>
                                        <div class="col-6">
                                          <br> <br>
                                        <button class="btn btn-primary"                   
                                        onclick="someCampos()" id="botao_cancelar"style="color:white"> Cancelar </button>
                                        </div>
                                        </center>
                                        </div>
                                      </div>
                                      <input type="hidden" name="codigo_livro" id="codigo_livro">
                                      <br> <br>
                                     
                                              `;
                                                  }
                                                }
                          
                                                document.querySelector("#autor").innerHTML = informacoes;
                                              })
                                              .catch((error) => {
                                                console.error("Erro na requisição fetch:", error);
                                              });
                                          }
                                          function someCampos() {
                                            var nome = document.querySelector("#nome_autor_editado");
                                            var nacionalidade = document.querySelector("#nacionalidade_editada");
                                            var nascimento_falecimento = document.querySelector(
                                              "#campos_nascimento_falecimento"
                                            );
                                            var biografia = document.querySelector("#biografia_editada");
                                            var botao_editar = document.getElementById("botao_editar");
                                            var botao_cancelar = document.getElementById("botao_cancelar");
                                            var categoria = document.querySelector("#select_categoria_editada");
                                            var periodo = document.querySelector("#select_periodo_editado");
                                            var botao_categoria = document.querySelector(
                                              "#botao_categoria_editada"
                                            );
                                            var botao_periodo = document.querySelector("#botao_periodo_editado");
                                            botao_categoria.style.display = "none";
                                            botao_periodo.style.display = "none";
                                            periodo.style.display = "none";
                                            categoria.style.display = "none";
                                            nome.style.display = "none";
                                            nacionalidade.style.display = "none";
                                            nascimento_falecimento.style.display = "none";
                                            biografia.style.display = "none";
                                            botao_editar.style.display = "none";
                                            botao_cancelar.style.display = "none";
                                          }
                                          function editarFoto(codigo) {
                                            document.getElementById("codigo_autor").value = codigo;
                                            modalImagem();
                                          }
                                          function cadastrarFoto() {
                                            const formData = new FormData();
                                            var foto = document.getElementById("arquivo").files[0];
                                            var codigo = document.getElementById("codigo_autor").value;
                          
                                            formData.append("codigo", codigo);
                                            formData.append("arquivo", foto);
                                            url = `php/autores/foto_cadastro.php`;
                          
                                            fetch(url, {
                                              method: "POST",
                                              body: formData,
                                            })
                                              .then((response) => response.json())
                                              .then((data) => {
                                                console.log(data);
                                                alert(data.mensagem);
                                                carregarAutores();
                                              })
                                              .catch((error) => {
                                                console.error("Erro na requisição fetch:", error);
                                              });
                                          }
                                          function editarAutor(categoriaSelecionada) {
                                            const formData = new FormData();
                                            var codigo = document.getElementById("codigo_autor").value;
                          
                                            var nome = document.querySelector("#nome_autor_editado").value;
                                            var nacionalidade = document.querySelector(
                                              "#nacionalidade_editada"
                                            ).value;
                                            var nascimento = document.querySelector(
                                              "#data_nascimento_editada"
                                            ).value;
                                            var falecimento = document.querySelector(
                                              "#data_falecimento_editada"
                                            ).value;
                                            var biografia = document.querySelector("#biografia_editada").value;
                          
                                            var categoria = document.getElementById("select_categoria_editada");
                                            var valor_categoria =
                                              categoria.options[categoria.selectedIndex].value;
                          
                                            var periodo = document.getElementById("select_periodo_editado");
                                            var valor_periodo = periodo.options[periodo.selectedIndex].value;
                          
                                            formData.append("codigo", codigo);
                                            formData.append("nome", nome);
                                            formData.append("nacionalidade", nacionalidade);
                                            formData.append("nascimento", nascimento);
                                            formData.append("falecimento", falecimento);
                                            formData.append("biografia", biografia);
                          
                                            formData.append("categoria", valor_categoria);
                                            formData.append("periodo", valor_periodo);
                          
                                            var url = "";
                          
                                            if (nome != null || nome != "") {
                                              url = `php/autores/autor_editar.php`;
                                            } else {
                                              alert("digita");
                                            }
                                            fetch(url, {
                                              method: "POST",
                                              body: formData,
                                            })
                                              .then((response) => response.json())
                                              .then((data) => {
                                                console.log(data);
                                                alert(data.mensagem);
                          carregarAutores();
                                              })
                                              .catch((error) => {
                                                console.error("Erro na requisição fetch:", error);
                                              });
                                          }
                          
                                          function apareceCampos() {
                                            var nome = document.querySelector("#nome_autor_editado");
                                            var nacionalidade = document.querySelector("#nacionalidade_editada");
                                            var nascimento_falecimento = document.querySelector(
                                              "#campos_nascimento_falecimento"
                                            );
                                            var biografia = document.querySelector("#biografia_editada");
                                            var categoria = document.querySelector("#select_categoria_editada");
                                            var periodo = document.querySelector("#select_periodo_editado");
                                            var botao_categoria = document.querySelector(
                                              "#botao_categoria_editada"
                                            );
                                            var botao_periodo = document.querySelector("#botao_periodo_editado");
                                            var botao_editar = document.getElementById("botao_editar");
                                            var botao_cancelar = document.getElementById("botao_cancelar");
                                            nome.style.display = "block";
                                            nacionalidade.style.display = "block";
                                            nascimento_falecimento.style.display = "block";
                                            biografia.style.display = "block";
                                            periodo.style.display = "block";
                                            categoria.style.display = "block";
                                            botao_editar.style.display = "block";
                                            botao_cancelar.style.display = "block";
                                            botao_categoria.style.display = "block";
                                            botao_periodo.style.display = "block";
                                          }
                          
                                          function mostraCampo(
                                            nomeAutor,
                                            codigoAutor,
                                            nacionalidade,
                                            nascimento,
                                            falecimento,
                                            biografia,
                                            categoriaSelecionada,
                                            periodoSelecionado
                                          ) {
                                            apareceCampos();
                                            carregaPeriodos(periodoSelecionado);
                                            carregarCategorias(categoriaSelecionada);
                                            document.querySelector("#codigo_autor").value = codigoAutor;
                          
                                            document.querySelector("#nome_autor_editado").value = nomeAutor;
                                            document.querySelector("#nacionalidade_editada").value =
                                              nacionalidade;
                                            document.querySelector("#data_nascimento_editada").value = nascimento;
                                            document.querySelector("#data_falecimento_editada").value =
                                              falecimento;
                                            document.querySelector("#biografia_editada").value = biografia;
                                            document.querySelector("#biografia_editada").value = biografia;
                                          }
                          
                                          function apagarAutor(codigo, nome) {
                                            var url = "php/autores/autor_excluir.php?codigo=" + codigo;
                                            if (confirm("Deseja realmente excluir:  " + nome + "?")) {
                                              fetch(url)
                                                .then((response) => response.json())
                                                .then((data) => {
                                                  var coisa = data.coisa;
                                                  if(coisa == 1){
                                                    alert(data.mensagem);
                          
                                                  }
                                                  else{
                                                    alert("Autor excluído com sucesso!");
                                                    window.location.href = "autores.html";
                                                  }
                                                });
                                            }
                                          }
                                          function optionCategorias() {
                                            var url = "php/categorias/categoria.php";
                          
                                            fetch(url)
                                              .then((response) => response.json())
                                              .then((data) => {
                                                console.log(data);
                                                var options = "";
                                                for (let item in data) {
                                                  options += `<option value="${data[item].tb04_nome_categoria}">${data[item].tb04_nome_categoria}</option>`;
                                                }
                          
                                                document.querySelector("#option_categoria").innerHTML = options;
                                              });
                                          }
                                          function carregaPeriodos(periodo) {
                                            var url = "php/periodos/periodo.php";
                          
                                            fetch(url)
                                              .then((response) => response.json())
                                              .then((data) => {
                                                console.log(data);
                          
                                                var options = "";
                                                for (let item in data) {
                                                  options += `
                                    <option value="${data[item].tb05_nome_periodo}" name="${data[item].tb05_nome_periodo}">${data[item].tb05_nome_periodo}</option>`;
                                                }
                          
                                                var selectElement = (document.querySelector(
                                                  "#select_periodo_editado"
                                                ).innerHTML = options);
                                                  var selectPeriodo = document.getElementById(
                                                  "select_periodo_editado"
                                                );
                                                var valorPeriodoDesejado = periodo;
                          
                                  for (var i = 0; i < selectPeriodo.options.length; i++) {
                                    var option = selectPeriodo.options[i];
                                    if (option.value === valorPeriodoDesejado) {
                                      option.selected = true;
                                      break;
                                    }
                                  }
                                  });
                                }
                          
                                          function carregarCategorias(categoria) {
                                            var url = "php/categorias/categoria.php";
                          
                                            fetch(url)
                                              .then((response) => response.json())
                                              .then((data) => {
                                                console.log(data);
                          
                                                var options = "";
                                                for (let item in data) {
                                                  options += `<option value="${data[item].tb04_nome_categoria}" name="${data[item].tb04_nome_categoria}">${data[item].tb04_nome_categoria}</option>`;
                                                }
                          
                                                document.querySelector("#select_categoria_editada").innerHTML =
                                                  options;
                                                var selectCategoria = document.getElementById(
                                                  "select_categoria_editada"
                                                );
                          
                                                var valorCategoriaDesejado = categoria;
                          
                                                for (var i = 0; i < selectCategoria.options.length; i++) {
                                                  var option = selectCategoria.options[i];
                                                  if (option.value === valorCategoriaDesejado) {
                                                    option.selected = true;
                                                    break;
                                                  }
                                                }
                                              });
                                          }
                          
                                          function carregarLivroAutor() {
                                            var queryString = window.location.search;
                                            const urlParams = new URLSearchParams(queryString);
                                            var codigo = urlParams.get("codigo");
                          
                                            var url = `php/autores/autor_livro.php?codigo=${codigo}`;
                                            fetch(url)
                                              .then((response) => response.json())
                                              .then((data) => {
                                                console.log(data);
                          
                                                var informacoes = "";
                                                var contador = 0;
                                                if (logado == "sim") {
                                                  informacoes = `<div class="col-3">
                                                <a href="#" id="Livross" onclick="modalLivro()">
                                                  <div class="caixa-livro-autor text-center" style="min-height:200px;width:170px;height:250px;margin-left:160px">
                                                    <i class="fas fa-plus icone"></i>
                                                  </div>
                                                  <h7 class="card-subtittle gcm"style="margin-left:80%">Adicionar</h7>
                                                </a>
                          
                                              </div>
                          
                                                         `;
                                                } else {
                                                  informacoes = `<div class="col-3 escondido">
                                                <a href="#" id="Livross" onclick="modalLivro()">
                                                  <div class="caixa-livro-autor text-center" style="min-height:200px;height:250px;width:170px;">
                                                    <i class="fas fa-plus icone"></i>
                                                  </div>
                                                  <h7 class="card-subtittle gcm">Adicionar</h7>
                                                </a>
                          
                                              </div>
                          
                                                         `;
                                                }
                          
                                                for (let item in data) {
                                                  if (logado == "sim") {
                                                    informacoes = `<div class="col-3"><br>
                                                <a href="#" id="Livross" onclick="modalLivro()">
                                                  <div class="caixa-livro-autor text-center"style="min-height:200px;height:250px;width:170px;margin-left: 10%">
                                                    <i class="fas fa-plus icone"></i>
                                                  </div>
                                                  <h7 class="card-subtittle gcm" style="margin-left: 10%">Adicionar</h7>
                                                </a>
                          
                                              </div>
                          
                                                         `;
                                                  } else {
                                                    informacoes = `<div class="col-3 escondido"><br>
                                                <a href="#" id="Livross" onclick="modalLivro()">
                                                  <div class="caixa-livro-autor text-center"style="min-height:200px;height:250px;width:170px;">
                                                    <i class="fas fa-plus icone"></i>
                                                  </div>
                                                  <h7 class="card-subtittle gcm">Adicionar</h7>
                                                </a>
                          
                                              </div>
                          
                                                         `;
                                                  }
                                                }
                                                for (let item in data) {
                                                  if (contador++ % 4 == 4) 
                                                  informacoes += "</div> <div class='row'>";
                          
                                                  informacoes += `
                                                  <br>
                                            <div class="col-3">
                                              <br> <div class="col-3" style="margin-right: 30%">
                                                <a href="telalivro.html?codigo=${data[item].tb01_id_livro}">
                                                  <img src="img/livros/${data[item].tb01_ftcapa}" style=" margin-top:85%;width:170px;  height:250px" class="livros" alt="${data[item].tb01_nome_livro}" />
                                                </a>
                                                <p style="width: 150px; word-break: normal">${data[item].tb01_nome_livro}</p>
                                              </div>
                                          </div>`;
                                                }
                          
                                                document.getElementById("livroses").innerHTML =
                                                  "<div class='row'>" + informacoes + "</div>";
                                              });
                                          }