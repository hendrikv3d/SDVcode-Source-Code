var maxAdmin;jQuery(document).ready(function($){maxAdmin=function(){return this},maxAdmin.prototype={colorUpdateTime:!0,fields:null,button_id:null,form_updated:!1,tabs:null},maxAdmin.prototype.init=function(){this.button_id=$('input[name="button_id"]').val(),$(document).on("click",".maxbutton-preview",function(t){t.preventDefault()}),$(document).on("click",".output .preview-toggle",$.proxy(this.toggle_preview,this)),$("#maxbuttons .input-paging").on("change",$.proxy(this.do_paging,this)),$(".manual-toggle").on("click",$.proxy(this.toggleManual,this)),$(".manual-entry").draggable({cancel:"p, li"}),$(document).on("submit","form.mb_ajax_save",$.proxy(this.formAjaxSave,this)),$(document).on("click","[data-buttonaction]",$.proxy(this.button_action,this)),$(document).on("reInitConditionals",$.proxy(this.initConditionials,this)),this.initConditionials(),0!=$("#new-button-form").length&&(this.button_id>0&&$("#maxbuttons .mb-message").show(),this.initResponsive(),$("#maxbuttons .output").draggable({cancel:".nodrag"}),$("#maxbuttons .color-field").wpColorPicker({width:300,change:$.proxy(_.throttle(function(t,e){t.preventDefault();var a=e.color.toString();this.update_color(t,e,a)},200),this)}),$(".input.color .arrows").on("click",$.proxy(this.copyColor,this)),$("#radius_toggle").on("click",$.proxy(this.toggleRadiusLock,this)),"undefined"!=typeof buttonFieldMap&&(this.fields=$.parseJSON(buttonFieldMap)),$("input").not(".color-field").on("keyup change",$.proxy(this.update_preview,this)),$("input.color-field").on("focus",$.proxy(this.select_field,this)),$("select").on("change",$.proxy(this.update_preview,this)),$(window).on("beforeunload",$.proxy(function(){return this.form_updated?maxcol_wp.leave_page:void 0},this)),$(document).on("keyup","input",function(t){return t.keyCode&&13==t.keyCode?($(":input")[$(":input").index(document.activeElement)+1].focus(),!1):void 0}),$(".button-save").click($.proxy(function(){return this.saveIndicator(!1),$("#new-button-form").submit(),!1},this)),$(".shortcode-expand").on("click",this.toggleShortcode))},maxAdmin.prototype.repaint_preview=function(){$('.mb_tab input[type="text"]').trigger("change"),$('.mb_tab input[type="number"]').trigger("change"),$(".mb_tab select").trigger("change"),$('.mb_tab input[type="hidden"]').trigger("change"),$('.mb_tab input[type="radio"]:checked').trigger("change"),$('.mb_tab input[type="checkbox"]:checked').trigger("change")},maxAdmin.prototype.update_preview=function(e){e.preventDefault(),this.saveIndicator(!0);var target=$(e.target),field=$(target).data("field");if("undefined"==typeof field)var id=$(target).attr("id");else var id=field;var data=this.fields[id];"undefined"!=typeof data&&("undefined"!=typeof data.css&&(value=target.val(),"undefined"!=typeof data.css_unit&&-1==value.indexOf(data.css_unit)&&(value+=data.css_unit),target.is(":checkbox")&&!target.is(":checked")&&(value=""),this.putCSS(data,value)),"undefined"!=typeof data.attr&&$(".output .result").find("a").attr(data.attr,target.val()),"undefined"!=typeof data.func&&eval("this."+data.func+"(target)"))},maxAdmin.prototype.select_field=function(t){$(t.target).select()},maxAdmin.prototype.button_action=function(t){t.preventDefault();var e=$(t.target).data("buttonaction");this.form_updated=!1;var a=$(t.target).data("buttonid"),o=$('input[name="'+e+'_nonce"]').val(),n=mb_ajax.ajaxurl,i={action:"mb_button_action",button_action:e,button_id:a,nonce:o};$.post({url:n,data:i,success:function(t){response=JSON.parse(t),"undefined"!=typeof response.redirection&&(window.location=response.redirection)},error:function(){console.log("error in button action"+e)}})},maxAdmin.prototype.checkCopyModal=function(t){this.form_updated?t.currentModal.find(".mb-message").show():$(t.currentModal).find(".mb-message").hide()},maxAdmin.prototype.toggle_preview=function(){$(".output .inner").is(":hidden")?($(".output .inner").show(),$(".output").css("height","auto"),$(".preview .preview-toggle").removeClass("dashicons-arrow-down").addClass("dashicons-arrow-up")):($(".output .inner").hide(),$(".output").css("height","auto"),$(".preview .preview-toggle").removeClass("dashicons-arrow-up").addClass("dashicons-arrow-down"))},maxAdmin.prototype.putCSS=function(t,e,a){a=a||"both";var o=".maxbutton";if("hover"==a?o="a.hover ":"normal"==a&&(o="a.normal "),"undefined"!=typeof t.csspart){var n=t.csspart.split(",");for(i=0;i<n.length;i++){var r=n[i],d=o+" ."+r;$(".output .result").find(d).css(t.css,e)}}else $(".output .result").find(o).css(t.css,e)},maxAdmin.prototype.update_color=function(t,e,a){t.preventDefault(),this.saveIndicator(!0);var o=$(t.target);-1===a.indexOf("#")&&(a="#"+a);var n=o.attr("id");if($("#"+n).val(a),-1!==n.indexOf("box_shadow"))this.updateBoxShadow(o);else if(-1!==n.indexOf("text_shadow"))this.updateTextShadow(o);else if(-1!==n.indexOf("gradient"))-1==n.indexOf("hover")?this.updateGradient():this.updateGradient(!0);else{if("button_preview"!=n){state=-1==n.indexOf("hover")?"normal":"hover";var i=this.fields[n];return void this.putCSS(i,a,state)}$(".output .result").css("backgroundColor",a)}},maxAdmin.prototype.copyColor=function(t){t.preventDefault(),t.stopPropagation();var e=$(t.target),a=$(t.target).parents("[data-bind]"),o="#"+a.data("id"),n="#"+a.data("bind");if(e.hasClass("arrow-right"))var i="right";else var i="left";if(a.hasClass("right"))var r="left";else var r="right";"left"==r?copy="right"==i?!0:!1:"right"==r&&(copy="right"==i?!1:!0),copy?($(n).val($(o).val()),$(n).trigger("change"),$(n).wpColorPicker("color",$(o).val())):($(o).val($(n).val()),$(o).trigger("change"),$(o).wpColorPicker("color",$(n).val()))},maxAdmin.prototype.updateGradient=function(t){t=t||!1;var e="";t&&(e="_hover");var a=parseInt($("#gradient_stop").val());isNaN(a)&&(a=45);var o=$("#use_gradient").prop("checked"),n=this.hexToRgb($("#gradient_start_color"+e).val()),i=this.hexToRgb($("#gradient_end_color"+e).val()),r=parseInt($("#gradient_start_opacity"+e).val()),d=parseInt($("#gradient_end_opacity"+e).val());if(o||(i=n,d=r),isNaN(r)&&(r=100),isNaN(d)&&(d=100),t)var s=$(".output .result").find("a.hover");else var s=$(".output .result").find("a.normal");s.css("background","linear-gradient( rgba("+n+","+r/100+") "+a+"%, rgba("+i+","+d/100+") )"),s.css("background","-moz-linear-gradient( rgba("+n+","+r/100+") "+a+"%, rgba("+i+","+d/100+") )"),s.css("background","-o-linear-gradient( rgba("+n+","+r/100+") "+a+"%, rgba("+i+","+d/100+") )"),s.css("background","-webkit-gradient(linear, left top, left bottom, color-stop("+a+"%, rgba("+n+","+r/100+")), color-stop(1, rgba("+i+","+d/100+") ));")},maxAdmin.prototype.hexToRgb=function(t){t=t.replace("#","");var e=parseInt(t,16),a=e>>16&255,o=e>>8&255,n=255&e;return a+","+o+","+n},maxAdmin.prototype.updateBoxShadow=function(t){t=t||null;var e=$("#box_shadow_offset_left").val(),a=$("#box_shadow_offset_top").val(),o=$("#box_shadow_width").val(),n=$("#box_shadow_spread").val(),i=$("#box_shadow_color").val(),r=$("#box_shadow_color_hover").val();$(".output .result").find("a.normal").css("boxShadow",e+"px "+a+"px "+o+"px "+n+"px "+i),$(".output .result").find("a.hover").css("boxShadow",e+"px "+a+"px "+o+"px "+n+"px "+r)},maxAdmin.prototype.updateTextShadow=function(t,e){e=e||!1;var a=$("#text_shadow_offset_left").val(),o=$("#text_shadow_offset_top").val(),n=$("#text_shadow_width").val(),i=$("#text_shadow_color").val(),r=$("#text_shadow_color_hover").val(),d=$(t).attr("id"),s=this.fields[d];s.css="textShadow";var p=a+"px "+o+"px "+n+"px "+i;this.putCSS(s,p,"normal"),p=a+"px "+o+"px "+n+"px "+r,this.putCSS(s,p,"hover")},maxAdmin.prototype.updateAnchorText=function(t){var e=$(".output .result").find("a .mb-text");0===e.length&&($(".output .result").find("a").append('<span class="mb-text"></span>'),$(".output .result").find("a .mb-text").css({display:"block","line-height":"1em","box-sizing":"border-box"}),this.repaint_preview()),$(".output .result").find("a .mb-text").text(t.val())},maxAdmin.prototype.updateGradientOpacity=function(){this.updateGradient(!0),this.updateGradient(!1)},maxAdmin.prototype.updateDimension=function(t){var e=$(t).val(),a=$(t).attr("id"),o=this.fields[a];e>0?this.putCSS(o,e):this.putCSS(o,"auto")},maxAdmin.prototype.updateRadius=function(t){var e=t.val(),a=["radius_bottom_left","radius_bottom_right","radius_top_left","radius_top_right"];if("lock"==$("#radius_toggle").data("lock"))for(i=0;i<a.length;i++){var o=a[i];$("#"+o).val(e);var n=this.fields[o];this.putCSS(n,e+"px")}},maxAdmin.prototype.toggleRadiusLock=function(t){var e=$(t.target),a=$(e).data("lock");"lock"==a?($(e).removeClass("dashicons-lock").addClass("dashicons-unlock"),$(e).data("lock","unlock")):"unlock"==a&&($(e).removeClass("dashicons-unlock").addClass("dashicons-lock"),$(e).data("lock","lock"))},maxAdmin.prototype.initResponsive=function(){window.maxFoundry.maxadmin.responsive=new mbResponsive($),window.maxFoundry.maxadmin.responsive.init(this)},maxAdmin.prototype.do_paging=function(t){var e=parseInt($(t.target).val());if(e<=parseInt($(t.target).attr("max"))){var a=$(t.target).data("url");window.location=a+"&paged="+e}},maxAdmin.prototype.toggleShortcode=function(){$(".shortcode-expand").hasClass("closed")?($(" .mb-message.shortcode .expanded").css("display","inline-block"),$(".shortcode-expand span").removeClass("dashicons-arrow-down").addClass("dashicons-arrow-up"),$(".shortcode-expand").removeClass("closed").addClass("open")):($(" .mb-message.shortcode .expanded").css("display","none"),$(".shortcode-expand span").addClass("dashicons-arrow-down").removeClass("dashicons-arrow-up"),$(".shortcode-expand").addClass("closed").removeClass("open"))},maxAdmin.prototype.toggleManual=function(t){t.preventDefault();var e=$(t.target),a=e.data("target"),o=$('.manual-entry[data-manual="'+a+'"]');if(o.is(":visible"))return o.hide(),!0;var n=$('[data-options="'+a+'"]').position(),i=n.top+e.height();o.css("top",i),o.css("right",15),o.css("left","auto"),o.show()},maxAdmin.prototype.initConditionials=function(){var t=this;$("[data-show]").each(function(){var e=$(this).data("show"),a=e.target,o=e.values;$(document).on("change",'[name="'+a+'"]',{child:this,values:o},$.proxy(t.updateConditional,t)),$('[name="'+a+'"]').trigger("change")})},maxAdmin.prototype.updateConditional=function(t){var e=t.data,a=e.values,o=e.child,n=$(t.currentTarget),i=$(n).val();if("checkbox"===n.attr("type")){var r=$(n).prop("checked");i="checked"==a&&r?"checked":"unchecked"!=a||r?0:"unchecked"}a.indexOf(i)>=0?($(o).fadeIn("fast"),$(o).find("input, select").trigger("change")):($(o).fadeOut("fast"),$(o).find("input, select").trigger("change"))},maxAdmin.prototype.saveIndicator=function(t){this.form_updated=t?!0:!1},maxAdmin.prototype.formAjaxSave=function(t){t.preventDefault();var e=mb_ajax.ajaxurl,a=$(t.target),o=a.serialize();$.ajax({type:"POST",url:e,data:o}).done($.proxy(this.saveDone,this))},maxAdmin.prototype.saveDone=function(t){$("[data-form]").prop("disabled",!1);var e=$.parseJSON(t),a=e.result,o=e.title,n=e.data.id;if("undefined"!=typeof e.data.new_nonce){{e.data.new_nonce}$('input[name="nonce"]').val(e.data.new_nonce)}if(a){$('input[name="collection_id"]').val(n);var i=window.location.href;-1===i.indexOf("collection_id")&&window.history.replaceState({},"",i+"&collection_id="+n),$(document).trigger("mbFormSaved");var r=$('input[name="sorted"]').val();$('input[name="previous_selection"]').val(r),e.data.reload&&document.location.reload(!0)}a||($modal=window.maxFoundry.maxmodal,$modal.newModal("collection_error"),$modal.setTitle(o),$modal.setContent(e.body),$modal.setControls('<button class="modal_close button-primary">'+e.close_text+"</button>"),$modal.show())}});