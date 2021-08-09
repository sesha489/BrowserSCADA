var squareRotation = 0.0;

var Posbuffers;
var Norbuffers;
var Colbuffers;
var Indbuffers;

main();

function main(){
    const canvas = document.querySelector("#gldemo");
    var gl = canvas.getContext("experimental-webgl");
    if(!gl){alert("WebGL is not supported in your browser");}
    
    // Vertex shader program
    var vsSource = 
		'attribute vec3 aVertexPosition;'+
		'attribute vec3 aVertexNormal;'+
		'attribute vec4 aVertexColor;'+
		'uniform mat4 uNormalMatrix;'+
		'uniform mat4 uModelViewMatrix;'+
		'uniform mat4 uProjectionMatrix;'+
		'varying vec3 normalInterp;'+
		'varying vec3 vertPos;'+
		'varying vec3 vColor;'+
		'void main(){'+
			'vColor = vec3(aVertexColor);'+
			'vec4 vertPos4 = uModelViewMatrix * vec4(aVertexPosition,1.0);'+
			'vertPos = vec3(vertPos4)/vertPos4.w;'+
			'normalInterp = vec3(uNormalMatrix * vec4(aVertexNormal, 0.0));'+
			'gl_Position = uProjectionMatrix * vertPos4;}';
    // Fragment shader program
    var fsSource = 
		'precision mediump float;'+
		'varying vec3 normalInterp;'+
		'varying vec3 vertPos;'+
		'varying vec3 vColor;'+
		'void main(){'+
			'vec3 lightPos = vec3(8000.0,8000.0,8000.0);'+
			'float shininessVal = 120.0;'+
			'vec3 ambientColor = vec3(0.3, 0.3, 0.3);'+
			'vec3 specularColor = vec3(1.0, 1.0, 1.0);'+
			'vec3 R;'+
			'vec3 V;'+
			'vec3 N = normalize(normalInterp);'+
			'vec3 L = normalize(lightPos - vertPos);'+
			'float lambertian = max(dot(N, L), 0.0);'+
			'float specular = 0.0;'+
			'float specAngle = 0.0;'+
			'if(lambertian > 0.0){'+
				'R = reflect(-L, N);'+
				'V = normalize(-vertPos);'+
				'specAngle = max(dot(R, V), 0.0);'+
				'specular = pow(specAngle, shininessVal);}'+
		'gl_FragColor = vec4((ambientColor+(lambertian*vColor)+(specular*specularColor)),1.0);}';
    
    var shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    
    var programInfo = {
        program: shaderProgram,
        attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
        vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
        },
        uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
        },
    };
    
    //var buffers = [];
    Posbuffers = [];
    Norbuffers = [];
    Colbuffers = [];
    Indbuffers = [];

    var i = 0;
    do{
        //buffers[i] = initBuffers(gl, i);
	initPosBuffers(gl, i);
	initNorBuffers(gl, i);
	initColBuffers(gl, i);
	initIndBuffers(gl, i);
        i++;
    } while(i<objCount);

    ResetPos();
    
    var then = 0;
    // Draw the scene repeatedly
    function render(now) {
        now *= 0.0001;  // convert to seconds=0.001 is the correct value but it was too fast
        var deltaTime = now - then;
        then = now;

        gl.clearColor(0.75, 0.75, 0.75, 1.0);  // Clear to black, fully opaque
        gl.clearDepth(1.0);                 // Clear everything
        gl.enable(gl.DEPTH_TEST);           // Enable depth testing
        gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
        // Clear the canvas before we start drawing on it.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        i = 0;
        do{
            drawScene(gl, programInfo, deltaTime, i);
            i++;
        } while(i<objCount);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

function initShaderProgram(gl, vsSource, fsSource) {
    var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // Create the shader program
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
        return null;
    }
  
    return shaderProgram;
}

function loadShader(gl, type, source) {
     var shader = gl.createShader(type);

    // Send the source to the shader object
    gl.shaderSource(shader, source);

    // Compile the shader program
    gl.compileShader(shader);

    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

function initPosBuffers(gl, i) {
    Posbuffers[i] = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, Posbuffers[i]);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objDetails[i*5]), gl.STATIC_DRAW);
}

function initNorBuffers(gl, i) {
    Norbuffers[i] = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, Norbuffers[i]);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objDetails[(i*5)+1]), gl.STATIC_DRAW);
}

function initColBuffers(gl, i) {
    var c = objDetails[(i*5)+2];
    var colors = [];
    for(var j=0; j<objDetails[(i*5)+3]; j++){
        //colors = colors.concat(c);
	for(var q=0; q<4; q++){
	    colors.push(c[q]);
	}
    }

    Colbuffers[i] = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, Colbuffers[i]);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.DYNAMIC_DRAW);
}

function initIndBuffers(gl, i) {
    Indbuffers[i] = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Indbuffers[i]);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(objDetails[(i*5)+4]), gl.STATIC_DRAW);
}

function drawScene(gl, programInfo, deltaTime, i) {
    var fieldOfView = 45 * Math.PI / 180;   // in radians
    var aspect = 800 / 600;
    var zNear = 50.0;
    var zFar = 15000.0;    //For Dosing Tank
    var projectionMatrix = mat4.create();

    mat4.perspective(projectionMatrix,fieldOfView,aspect,zNear,zFar);

    var modelViewMatrix = mat4.create();

    TransEx();

    var eyePos = [EPx, EPz, EPy];
    var targetPos = [TPx, TPz, TPy];
    var upDir = [0.0, 1.0, 0.0];
    mat4.lookAt(modelViewMatrix, eyePos, targetPos, upDir);

    mat4.translate(modelViewMatrix,modelViewMatrix,[CTx, CTy, CTz]);

    const normalMatrix = mat4.create();
    mat4.invert(normalMatrix, modelViewMatrix);
    mat4.transpose(normalMatrix, normalMatrix);


    if(ColorUpt===1){
	/*var i = 0;
	do{
	    initColBuffers(gl, i);
	    i++;
	} while(i<objCount);*/

	objDetails[(RefColOld*5)+2] = TempCol;
	initColBuffers(gl, RefColOld);
	TempCol = objDetails[(RefColNum*5)+2];
	objDetails[(RefColNum*5)+2] = TrgtCol;
	initColBuffers(gl, RefColNum);
	RefColOld = RefColNum;

	ColorUpt = 0;
    }

    {
        var numComponents = 3;
        var type = gl.FLOAT;
        var normalize = false;
        var stride = 0;
        var offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, Posbuffers[i]);
        gl.vertexAttribPointer(
            programInfo.attribLocations.vertexPosition,
            numComponents,
            type,
            normalize,
            stride,
            offset);
        gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
    }

    {
        const numComponents = 3;
    	const type = gl.FLOAT;
    	const normalize = false;
    	const stride = 0;
    	const offset = 0;
    	gl.bindBuffer(gl.ARRAY_BUFFER, Norbuffers[i]);
    	gl.vertexAttribPointer(programInfo.attribLocations.vertexNormal,
            numComponents,
            type,
            normalize,
            stride,
            offset);
    	gl.enableVertexAttribArray(programInfo.attribLocations.vertexNormal);
    }

    {
        var numComponents = 4;
        var type = gl.FLOAT;
        var normalize = false;
        var stride = 0;
        var offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, Colbuffers[i]);
        gl.vertexAttribPointer(
            programInfo.attribLocations.vertexColor,
            numComponents,
            type,
            normalize,
            stride,
            offset);
        gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Indbuffers[i]);

    gl.useProgram(programInfo.program);

    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix);
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix);
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.normalMatrix,
        false,
        normalMatrix);

    {
        const type = gl.UNSIGNED_SHORT;
        const offset = 0;
        gl.drawElements(gl.TRIANGLES, objDetails[(i*5)+3], type, offset);
    }

    if(RotPer == 1.0){
        if(squareRotation <=359){
	    squareRotation += 0.00001;
        }else{
	    squareRotation = 0.0;
        }
    }
}
