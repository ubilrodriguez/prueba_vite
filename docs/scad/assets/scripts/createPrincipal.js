import { 
    siarp_initDrawVRM, 
    siarp_audioStart, 
    siarp_audioPause, 
    siarp_audioResume 
} from '../../../../docs/script';

function scad_PagePrincipal() {
    try {
        createPagePrincipal();
    } catch (error) {
        console.error("Error in page principal initialization:", error);
    }
}

function createPagePrincipal() {
    try {
        var contGrnl = new scad_ctrlPanel(document.body, "id", "class");
        contGrnl.addPosition("absolute");
        contGrnl.sizePanel("100%", "100%");
        contGrnl.addImagePanel("scad/assets/img/scad_demoRegister/fondo.jpg", "1");

        var contGrnlSon = new scad_ctrlPanel(contGrnl.getHandler(), "scad_DashArea", "cam_DashArea");
        
        contGrnlSon.addPosition("absolute");
        contGrnlSon.sizePanel("90%", "95%");
        contGrnlSon.movePanel("5%", "2%", true);   
                
        var contSonBody = new scad_ctrlPanel(contGrnlSon.getHandler(), "cam_DashBody", "cam_DashBody");
        contSonBody.addPosition("absolute");
        contSonBody.sizePanel("100%", "100%");
        contSonBody.movePanel("0%", "0%", true);
        contSonBody.addColorPanel("black");

        var contSubMenu = new scad_ctrlPanel(contGrnlSon.getHandler(), "cam_DashButtons", "cam_DashButtons");
        
        var contBtnStart = new scad_ctrlBoton(contSubMenu.getHandler(), "butt_upAllProc", "cam_DashButt");
        contBtnStart.addTooltip("Empezar");
        contBtnStart.addImageButton("scad/assets/img/scad_demoRegister/start.png");
        contBtnStart.getHandler().onclick = () => {
            contBtnPausa.showButton("inline-block");
            contBtnStart.hiddenButton();
            if (typeof siarp_audioStart === 'function') {
                siarp_audioStart();
            } else {
                console.warn("siarp_audioStart is not a function");
            }
        };
            
        var contBtnPausa = new scad_ctrlBoton(contSubMenu.getHandler(), "butt_stop", "cam_DashButt");
        contBtnPausa.addTooltip("Pausar");
        contBtnPausa.addImageButton("scad/assets/img/scad_demoRegister/pausa.png");
        contBtnPausa.hiddenButton();
        
        contBtnPausa.getHandler().onclick = function() {
            contBtnStart.showButton("inline-block");
            contBtnPausa.hiddenButton();
            if (typeof siarp_audioPause === 'function') {
                siarp_audioPause();
            } else {
                console.warn("siarp_audioPause is not a function");
            }
        };
        
        var contBtnRegister = new scad_ctrlBoton(contSubMenu.getHandler(), "butt_upAllProc", "cam_DashButt");
        contBtnRegister.addTooltip("Registrar");
        contBtnRegister.addImageButton("scad/assets/img/scad_demoRegister/register.png");
        
        contBtnRegister.getHandler().onclick = function() {
            window.open('indexRegister.html', '_self');
        };

        var contBtnData = new scad_ctrlBoton(contSubMenu.getHandler(), "butt_upAllProc", "cam_DashButt");
        contBtnData.addTooltip("View");
        contBtnData.addImageButton("scad/assets/img/scad_demoRegister/data.png");
        contBtnData.getHandler().onclick = function() {
            window.open('indexInformation.html', '_self');
        };
        
        var contBtnScreem = new scad_ctrlBoton(contSubMenu.getHandler(), "butt_screemAll", "cam_DashButt");
        contBtnScreem.addTooltip("Screem");
        contBtnScreem.addImageButton("scad/assets/img/scad_demoRegister/screem.png");
        contBtnScreem.getHandler().onclick = function() {
            contSonBody.fullScreen();
        };

        // Add error handling for VRM initialization
        if (typeof siarp_initDrawVRM === 'function') {
            try {
                siarp_initDrawVRM();
            } catch (vrmError) {
                console.error("Error initializing VRM:", vrmError);
            }
        } else {
            console.warn("siarp_initDrawVRM is not a function");
        }
    } catch (error) {
        console.error("Error in createPagePrincipal:", error);
    }
}

scad_PagePrincipal();