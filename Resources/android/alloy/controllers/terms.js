function Controller() {
    function done() {
        Titanium.API.info("Quit terms");
        $.win.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "terms";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId24 = Ti.UI.createScrollView({
        contentHeight: "auto",
        layout: "vertical",
        showVerticalScrollIndicator: "true",
        bottom: "50",
        id: "__alloyId24"
    });
    $.__views.win.add($.__views.__alloyId24);
    $.__views.mainView = Ti.UI.createView({
        backgroundColor: "white",
        width: "100%",
        height: Ti.UI.SIZE,
        top: 0,
        left: 0,
        id: "mainView"
    });
    $.__views.__alloyId24.add($.__views.mainView);
    $.__views.label1 = Ti.UI.createLabel({
        color: "#04cbca",
        font: {
            fontFamily: "SourceSansPro-Regular"
        },
        id: "label1",
        text: "Términos y Condiciones de Uso de la Aplicación Match Ideas",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: "20",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    $.__views.mainView.add($.__views.label1);
    $.__views.__alloyId25 = Ti.UI.createView({
        width: "100%",
        height: "1000",
        id: "__alloyId25"
    });
    $.__views.__alloyId24.add($.__views.__alloyId25);
    $.__views.label2 = Ti.UI.createLabel({
        font: {
            fontFamily: "SourceSansPro-Regular"
        },
        text: "Estos términos y condiciones (estos “Términos y Condiciones”) establecen las reglas y regulan el uso de la aplicación Match Ideas (la “Aplicación”).  Al descargar y/o utilizar la Aplicación, el Usuario, sea emprendedor, asesor y/o inversionista (en lo sucesivo, cada uno referido como “Emprendedor”, “Asesor” o “Inversionista”, según sea aplicable, y conjuntamente referidos como los “Usuarios” e individualmente también referidos como el “Usuario”), conviene regirse de conformidad con los Términos y Condiciones que se establecen a continuación.\n	\n	La Aplicación tiene como finalidad facilitar la interacción entre Emprendedores e Inversionistas, con el propósito de que el Emprendedor de a conocer a los Usuarios de la Aplicación (la “Comunidad”) su idea, proyecto o propuesta (la “Idea”) y, en su caso, obtenga capital para financiarla, así como también le permite al Emprendedor interactuar con Asesores que formen parte de la Comunidad y que están especializados en diversas materias.\n	Los Usuarios manifiestan y garantizan que las Ideas que compartan con la Comunidad son y serán en todo momento de su propiedad exclusiva, que la información ahí contenida es verdadera y correcta, y que no están violando (ni violaran) acuerdos, convenios o contratos de confidencialidad.\n	Por lo anterior, los Usuarios manifiestan y garantizan que no utilizarán, reproducirán, copiarán, distribuirán, modificarán ni alterarán, sea total o parcialmente, cualquier información que no sea de su propiedad exclusiva.\n	El Usuario que divulgue, utilice, reproduzca, distribuya, modifique o altere una Idea que no sea de su propiedad exclusiva y/o que infrinja o lesione derechos de terceros, será responsable de los daños y perjuicios que ocasione con dicha divulgación, utilización, reproducción, distribución, modificación o alteración. Por lo tanto, los Usuarios responderán de manera ilimitada por los daños y perjuicios que ocasionen a terceros como consecuencia del incumplimiento a sus obligaciones previstas en estos Términos y Condiciones, los términos y condiciones de Google Inc. o Apple Inc., según sea aplicable, y/o cualquier otra disposición contendida en convenios o contratos que tenga celebrados, o en las leyes aplicables.\n	Las Ideas que los Usuarios decidan compartir con la Comunidad serán de su propiedad exclusiva, salvo que dicho Usuario no concluya el proceso de validación dentro del plazo de 60 días naturales siguientes a la fecha de inicio de dicho proceso de validación.  Transcurrido dicho plazo sin que el Usuario haya concluido el proceso de validación, la Idea pasará a formar parte de la Comunidad y cualquier Usuario podrá desarrollarla.\n	El proceso de validación se divide en las siguientes etapas: (a) idea, en esta etapa se hace una descripción de la idea, se especifica la industria a la que va dirigida, se identifica el problema, se propone una solución y se señalan las características básicas de la Idea, (b) mercado, en este etapa se establece el mercado meta, la competencia directa e indirecta, la ventaja competitiva y los canales de distribución, (c) modelo de negocio, en esta etapa se menciona el ingreso y los gastos estimados, el punto de equilibrio, el monto de la inversión, así como el retorno de inversión, y (d) plan de acción, en esta etapa se identifican los miembros del equipo, la tarea de cada uno de los miembros y las fechas de entrega.  \n	Los Usuarios manifiestan y garantizan que: cuentan con la capacidad y autoridad suficiente para celebrar y aceptar estos Términos y Condiciones; entienden los riesgos implícitos que conlleva realizar una inversión; se conducirán y actuaran de manera profesional en toda interacción y/o comunicación que tengan con otros Usuarios de la Comunidad; utilizaran la Aplicación de forma lícita, diligente y correcta, respetando en todo momento estos Términos y Condiciones, los términos y condiciones aplicables de Google Inc. y Apple Inc., así como todas las leyes aplicables.\n	Los Usuarios convienen y en este acto se obligan a sacar libre y a salvo a Match Ideas, sus accionistas, subsidiarias, afiliadas, directores, administradores, asesores, cesionarios y/o sus sucesores autorizados, de toda y cualesquier responsabilidad que surja con motivo de, o en relación a, el uso de la Aplicación y convienen en indemnizar y reembolsar a Match Ideas cualquier costo o gasto en que Match Ideas incurra con motivo de lo anterior (incluyendo gastos y honorarios de abogados), y en este acto renuncian a cualquier acción legal que pudieran tener en contra de Match Ideas que se relacione con lo anterior. \n	Queda perfectamente entendido que el uso de la Aplicación es responsabilidad exclusiva del Usuario que la utiliza, y Match Ideas no otorga garantía alguna, expresa o implícita, ni de ningún otro tipo, ni asume ningún tipo de responsabilidad frente a los Usuario.\n	Match Ideas no otorga garantía alguna: a los Emprendedores respecto a que los Inversionistas estarán interesados en sus Ideas ni que obtendrán capital para financiarlas; a los Inversionistas respecto a que las Ideas de los Emprendedores serán exitosas ni que las mismas no infringen derechos de terceros, incluyendo pero no limitando, derechos de propiedad intelectual o industrial.\n	Match Ideas no es ni será responsable sobre los consejos y/o asesorías que los Asesores otorguen a otros Usuarios de la Comunidad, ni asume ningún tipo de responsabilidad por los daños y perjuicios ocasionados con motivo de o en relación a dichos consejos o asesorías.\n	Match Ideas no es ni será responsable de la veracidad, suficiencia, exactitud o legalidad de la información contenida o transmitida mediante el uso de la Aplicación, ni garantiza a los Usuarios la satisfacción o el éxito de las relaciones que pudieran llegar a surgir entre los Usuarios de la Comunidad (sean esta laborales, comerciales o de cualquier otro tipo).\n	Match Ideas no será responsable ni estará obligado a verificar la viabilidad de una Idea, la capacidad económica de los Inversionistas ni la capacidad de los Asesores.\n	Match Ideas no será responsable ni estará obligado a participar o asistir a los Usuario en disputas o reclamaciones que surjan entre los Usuarios y que no se relacionen directamente con el uso de la Aplicación.\n	Match Ideas podrá utilizar cualquier Idea, comentario y/o publicación con fines de publicidad exclusivamente, por lo que los Usuarios están de acuerdo y autorizan a Match Ideas para tales efectos, por lo que se reserva el derecho de compartir y/o publicar las Ideas, propuestas o comunicaciones de los Usuarios, y los Usuarios reconocen que lo anterior en ningún momento creará una relación legal entre Match Ideas y los Usuarios o que constituirá una violación a los derechos de propiedad intelectual o industrial que pudieran estar asociados a dichas Ideas, propuestas o comunicaciones.\n	Match Ideas no está ni estará obligado a publicar las Ideas de los Emprendedores, las propuestas de los Inversionistas, las asesorías y/o consejos de los Asesores, ni a introducir a los Emprendedor con uno o más Inversionistas.\n	Match Ideas se reserva el derecho exclusivo de interrumpir, modificar y/o alterar, a su discreción y opción, el contenido y/o acceso a la Aplicación, en cualquier momento y sin previo aviso, sea por cuestiones técnicas, de seguridad, de control, de mantenimiento o por cualquier otra causa.\n	Match Ideas se reserva el derecho exclusivo de excluir y negarle el uso de la Aplicación a cualquier Usuario que incumpla con estos Términos y Condiciones o que, a juicio de Match Ideas, ponga en riesgo la Aplicación, a Match Ideas o a otros Usuario.\n	Match Ideas no será responsable por los daños y perjuicios que puedan ocasionarse por la presencia de un virus u otros elementos contenidos o transmitidos por medio de la Aplicación y que puedan alterar o producir una alteración en los sistemas informáticos, así como en los documentos o sistemas almacenados en los mismos, siempre y cuando dicha presencia, contenido o transmisión no sea atribuible a Match Ideas ni como consecuencia de un acto negligente de Match Ideas.\n	La Aplicación es propiedad exclusiva de Match Ideas, LLC. (la “Empresa” o “Match Ideas”) y Match Ideas no le otorga a los Usuarios titularidad alguna sobre la Aplicación.  El Usuario adquiere únicamente una licencia de uso, conforme a los términos y condiciones aplicables al contenido digital de Google Play o Apple Store Application.  Por lo anterior, todos los derechos en y sobre la Aplicación (excluyendo el contenido proporcionado por los Usuarios) es y serán en todo momento propiedad exclusiva de Match Ideas.  \n	El contenido de la Aplicación, incluyendo pero no limitando, textos, imágenes, logotipos, audio, video, marcas, bases de datos, diseños gráficos, códigos fuentes y software, son propiedad exclusiva de Match Ideas u otros terceros, cuyos derechos de propiedad intelectual e industrial Match Ideas reconoce, los cuales pueden estar protegidos por disposiciones legales nacionales e internacionales, por lo que ningún Usuario está autorizado a utilizarlos sin la previa autorización por escrito del titular de dichos derechos.\n	Estos términos y condiciones se regirán e interpretarán de conformidad con las leyes y normas mercantiles de México, y los Usuarios convienen que cualquier controversia que surja con motivo de la interpretación o ejecución de estos Términos y Condiciones se someterá a la jurisdicción exclusiva de los tribunales competentes del fuero común ubicados en la ciudad de Monterrey, Nuevo León, México, por lo que renuncian a cualquier otra jurisdicción que sea aplicable en virtud de sus domicilios presentes o futuros o por cualquier otra circunstancia.",
        id: "label2",
        color: "#333333"
    });
    $.__views.__alloyId25.add($.__views.label2);
    $.__views.__alloyId26 = Ti.UI.createView({
        id: "__alloyId26"
    });
    $.__views.win.add($.__views.__alloyId26);
    $.__views.ok = Ti.UI.createButton({
        id: "ok",
        title: "Acepto",
        bottom: "50",
        width: "200",
        height: "30",
        backgroundColor: "white",
        color: "black"
    });
    $.__views.__alloyId26.add($.__views.ok);
    done ? $.__views.ok.addEventListener("click", done) : __defers["$.__views.ok!click!done"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.ok!click!done"] && $.__views.ok.addEventListener("click", done);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;