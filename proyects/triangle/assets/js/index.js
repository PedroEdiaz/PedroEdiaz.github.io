const imports_util = 
{
	_read_file: (c0) =>
	{
		const request = new XMLHttpRequest();
		request.open( "GET", _get_str(c0), false );
		request.send( null );
		ids.push( request.responseText );
		return ids.length-1;
	},
}

function _get_str( c0 )
{
	const data = new Uint8Array(exports.memory.buffer, c0, exports._strlen(c0) );
	return new TextDecoder().decode(data);
};

async function load_wasm( src )
{
	let imports = 
	{
		env:
		{
			...imports_webgl,
			...imports_util,
		}
	}

	exports = (await 
		WebAssembly.instantiateStreaming(fetch(src), imports )
		).instance.exports;

	gl = document.getElementById("webgl-canvas").getContext("webgl2");

	exports.draw();
}

load_wasm( "./assets/main.wasm" );
