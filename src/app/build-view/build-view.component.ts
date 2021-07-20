import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-build-view',
  templateUrl: './build-view.component.html',
  styleUrls: ['./build-view.component.css']
})
export class BuildViewComponent implements OnInit, AfterViewInit {
  @ViewChild('sceneCanvas') private canvas : ElementRef<HTMLCanvasElement>;
  private renderingContext : RenderingContext;
  
  private get webgl(): WebGLRenderingContext{
    return this.renderingContext as WebGLRenderingContext;
  }

  
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void{
    this.renderingContext = this.canvas.nativeElement.getContext("webgl");
    if (!this.webgl){
      alert('Failed to get WebGLContext');
      return;
    }
    this.webgl.canvas.width = this.canvas.nativeElement.clientWidth;
    this.webgl.canvas.height = this.canvas.nativeElement.clientHeight;

    this.webgl.clearColor(0.0,0.0,0.0,0.0);
    this.webgl.enable(this.webgl.DEPTH_TEST);
    this.webgl.depthFunc(this.webgl.LEQUAL);
    this.webgl.clear(this.webgl.COLOR_BUFFER_BIT | this.webgl.DEPTH_BUFFER_BIT);

    const vsSource =  `
      attribute vec4 aVertexPosition;
      uniform   mat4 uModelViewMatrix;
      uniform   mat4 uProjectionMatrix;
      void main(){
        gl_Position = uProjectionMatrix*uModelViewMatrix * aVertexPosition;
      }`;

      const fsSource = `
      void main(){
        gl_FragColor=vec4(1.0,0.0,1.0,1.);
      }`;

      const vshader = this.webgl.createShader(this.webgl.VERTEX_SHADER);
      this.webgl.shaderSource(vshader, vsSource);
      this.webgl.compileShader(vshader);
      
      const fshader = this.webgl.createShader(this.webgl.FRAGMENT_SHADER);
      this.webgl.shaderSource(fshader, fsSource);
      this.webgl.compileShader(fshader);
      
      const shader = this.webgl.createProgram();
      this.webgl.attachShader(shader, vshader);
      this.webgl.attachShader(shader, fshader);
      this.webgl.linkProgram(shader);

      const programInfo = {
        program : shader,
        attribLocations : {
          vertexPosition : this.webgl.getAttribLocation(shader, 'aVertexPosition'),
        },
        uniformLocations :{
          projectionMatrix : this.webgl.getUniformLocation(shader, 'uProjectionMatrix'),
          modelViewMatrix : this.webgl.getUniformLocation(shader, 'uModelViewMatrix'),    
        },
      };

      const positionBuffer = this.webgl.createBuffer();
      this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, positionBuffer);
      this.webgl.bufferData(this.webgl.ARRAY_BUFFER, new Float32Array([1.0,1.0,-1.0,1.0,1.0,-1.0,-1.0,-1.0]), this.webgl.STATIC_DRAW);
      this.webgl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        2,
        this.webgl.FLOAT,
        false,
        0,
        0);
      this.webgl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
      this.webgl.useProgram(programInfo.program);
      this.webgl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, [2.414214,0,0,0,0,2.414214,0,0,0,0,-1.002,-1,0,0,-0.2002,0]);
      this.webgl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, [1,0,0,0,0,1,0,0,0,0,1,0,0,0,-8,1]);
      this.webgl.drawArrays(this.webgl.TRIANGLE_STRIP, 0, 4);
  }

}
