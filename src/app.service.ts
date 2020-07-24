import { Injectable } from '@nestjs/common';
import * as PSD from "psd";

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getPsd() {
    let baseUrl = 'http://localhost:3000'
    let ret = []
    var psd = PSD.fromFile("src/assets/OBFJDK1.psd");
    psd.parse();
    // let tree = psd.tree().export().children
    psd.image.saveAsPng('public/images/output.png');
    let i = 0;
    psd.tree().descendants().forEach(function (node) {
      if (node.isGroup()) return true;
      console.log(node)
      node.saveAsPng("public/images/" + node.name + `_${i}` + ".png").catch(function (err) {
        console.log(err.stack);
      });
      let res = {
        top: node.layer.top,
        left: node.layer.left,
        bottom: node.layer.bottom,
        right: node.layer.right,
        channels: node.layer.channels,
        height: node.layer.height,
        rows: node.layer.rows,
        width: node.layer.width,
        cols: node.layer.cols,
        opacity: node.layer.opacity,
        visible: node.layer.visible,
        clipped: node.layer.clipped,
        layerEnd: node.layer.layerEnd,
        image: `${baseUrl}/public/images/${node.name}_${i}.png`,
      }
      ret.push(res)

      // node.imgBase64 = new Buffer(node.layer.file.data).toString('base64');
      i++
    });
    return ret
  }
}
