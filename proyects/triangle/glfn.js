var ids=[];
var gl = null;
var imports = null;

{
	const memory =  new WebAssembly.Memory(
	{
		initial: 2,
		maximum: 10,
		shared: false,
	});

	imports = 
	{
		'memory': memory,
	}
}


async function load_wasm( src )
{

	let imports_wasm = (await WebAssembly.instantiateStreaming(fetch(src), {env:imports,} )).instance.exports;

	imports = 
	{
		...imports,
		...imports_wasm,
	}

}
const imports_glfn = 
{
	glfnCreateWindow: (c0, c1, c2 ) =>
	{
		canvas=document.createElement("canvas");
		document.body.appendChild(canvas);

		canvas.width=c0;
		canvas.height=c1;
		canvas.id=imports._get_str(c2);

		ids.push( canvas );
		return ids.length-1;
	},
	glfnMakeContextCurrent: (c0) =>
	{
		gl = ids[c0].getContext( "webgl2" );
	},
	glfnSetDrawCallback: (c0,c1) =>
	{
		imports.glfnMakeContextCurrent(c0);
		window.setInterval( imports.__indirect_function_table.get(c1) );
	},
};

imports =
{
	...imports,
	...imports_glfn,
}
const imports_util = 
{
	_get_str: (c0) =>
	{
		const data = new Uint8Array(imports.memory.buffer, c0, imports.strlen(c0) );
		return new TextDecoder().decode(data);
	},

	_read_file: (c0) =>
	{
		const request = new XMLHttpRequest();
		request.open( "GET", imports._get_str(c0), false );
		request.send( null );
		ids.push( request.responseText );
		return ids.length-1;
	},
};

imports=
{
	...imports,
	...imports_util,
}
const imports_webgl =
{
	glClearColor: (c0,c1,c2,c3) => 
	{ 
		return gl.clearColor(c0,c1,c2,c3); 
	},
	glClear: (c0) => 
	{ 
		return gl.clear(c0); 
	},

	glDrawArrays: (c0,c1,c2) => 
	{ 
		return gl.drawArrays(c0,c1,c2); 
	},

	glCreateVertexArray: () =>
	{
		ids.push(gl.createVertexArray());
		return ids.length-1;
	},
	glBindVertexArray: (c0) =>
	{
		return gl.bindVertexArray(ids[c0]);
	},
	glEnableVertexAttribArray: (c0) =>
	{
		return gl.enableVertexAttribArray(c0);
	},
	glVertexAttribPointer: (c0,c1,c2,c3,c4,c5) =>
	{
		return gl.vertexAttribPointer(c0,c1,c2,c3,c4,c5);
	},

	glCreateBuffer: () =>
	{
		ids.push(gl.createBuffer());
		return ids.length-1;
	},
	glBindBuffer: (c0,c1) =>
	{
		return gl.bindBuffer(c0,ids[c1]);
	},
	glBufferData: (c0,c1,c2,c3) =>
	{
		const data = new Uint8Array(imports.memory.buffer);
		return gl.bufferData(c0,data,c3,c2,c1);
	},

	glCreateProgram: () =>
	{
		ids.push(gl.createProgram());
		return ids.length-1;
	},
	glUseProgram: (c0) =>
	{
		return gl.useProgram( ids[c0] );
	},
	glLinkProgram: (c0) =>
	{
		return gl.linkProgram( ids[c0] );
	},

	glCreateShader: (c0) =>
	{
		ids.push(gl.createShader(c0));
		return ids.length-1;
	},
	_glShaderSource: (c0,c1) =>
	{
		gl.shaderSource( ids[c0], ids[c1] );
	},
	glCompileShader: (c0) =>
	{
		return gl.compileShader( ids[c0] );
	},
	glGetShaderParameter: (c0, c1) =>
	{
		return gl.getShaderParameter( ids[c0], c1 );
	},
	glAttachShader: (c0,c1) =>
	{
		return gl.attachShader( ids[c0], ids[c1]);
	},
	glDeleteShader: (c0) =>
	{
		return gl.deleteShader( ids[c0] );
	},
};

imports=
{
	...imports,
	...imports_webgl
}
