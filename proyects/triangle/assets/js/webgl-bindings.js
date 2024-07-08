var ids = [];
var gl = null;
var exports = null;
var imports = {};

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
		const data = new Uint8Array(exports.memory.buffer);
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
		return gl.attachShader( ids[c0],ids[c1]);
	},
	glDeleteShader: (c0) =>
	{
		return gl.deleteShader( ids[c0] );
	},
};
