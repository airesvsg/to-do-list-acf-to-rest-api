jQuery( function( $ ) {

	var url  = WP_API_Settings.root + 'wp/v2/todos/';
	var form = $( '.form' );
	var list = $( '.list' );

	function template( data ) {
		var html = '';
		
		html += '<li class="list-item' + ( data.acf.done ? ' list-item-checked' : '' ) + '" data-id="' + data.id + '">';
			html += '<label class="list-item-label">';
				html += '<input type="checkbox" class="list-check" value="1" name="field[done]" ' + ( data.acf.done ? 'checked' : '' )+ '>';
				html += '<p class="list-title">' + data.title.rendered + '</p>';
				html += '<a href="#" class="btn btn-remove">remove</a>';
			html += '</label>';
		html += '</li>';

		return html;
	}

	// Load todos
	$.get( url + '?orderby=id&order=asc&per_page=100', function( data ){
		for( var i in data ) {
			list.prepend( template( data[i] ) );
		}
	}, 'json' );

	// Save todo
	form.submit( function(e) {
		e.preventDefault();

		var self = $( this );		
		var data = self.serialize();

		$.ajax( {
			url: url,
			method: 'POST',
			beforeSend: function ( xhr ) {
				// https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/
				xhr.setRequestHeader( 'X-WP-Nonce', WP_API_Settings.nonce );
			},
			data: data,
			dataType: 'json'
		} )
		.done( function ( data ) {
			list.prepend( template( data ) );
			self.find( '.input-text' ).val( '' );
		} )
		.fail( function( data ) {
			alert( data.responseJSON.message );
		} );
	} );

	// Change state of todo
	list.on( 'change', '.list-check', function( e ) {
		e.preventDefault();

		var self = $( this );
		var item = self.closest( '.list-item' );
		var id = item.data( 'id' );
		var data = {
			'fields[done]': self.is( ':checked' ) ? 1 : 0
		};

		$.ajax( {
			url: url + id,
			method: 'PUT',
			beforeSend: function( xhr ) {
				// https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/
				xhr.setRequestHeader( 'X-WP-Nonce', WP_API_Settings.nonce );
			},
			data: data,
			dataType: 'json'
		} )
		.done( function ( data ) {
			if ( data.acf.done ) {
				item.addClass( 'list-item-checked' );
			} else {
				item.removeClass( 'list-item-checked' );
			}
		} )
		.fail( function( data ) {
			alert( data.responseJSON.message );
		} );;
	} );

	// Remove todo
	list.on( 'click', '.btn-remove', function( e ) {
		e.preventDefault();

		var self = $( this );
		var item = self.closest( '.list-item' );
		var id = item.data( 'id' );
		
		$.ajax( {
			url: url + id,
			method: 'DELETE',
			beforeSend: function( xhr ) {
				// https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/
				xhr.setRequestHeader( 'X-WP-Nonce', WP_API_Settings.nonce );
			}
		} )
		.done( function( data ) {
			item.fadeOut( 'fast', function() {
				$( this ).remove();
			} );
		} )
		.fail( function( data ) {
			alert( data.responseJSON.message );
		} );
	} );

} );