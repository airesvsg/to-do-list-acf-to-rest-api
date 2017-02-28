<?php

// Registered field groups will not appear in the list of editable field groups.
require_once get_template_directory() . '/acf-fields.php';

add_action( 'wp_enqueue_scripts', function() {
	wp_enqueue_style( 'style', get_stylesheet_uri() );	
	wp_enqueue_script( 'script', get_template_directory_uri() . '/script.js', array( 'jquery' ), false, true );
	wp_localize_script( 'script', 'WP_API_Settings', array( 'root' => esc_url_raw( rest_url() ), 'nonce' => wp_create_nonce( 'wp_rest' ) ) );
} );

add_action( 'init', function() {
	register_post_type( 'todo', array(
			'public'       => true,
			'label'        => 'Todos',
			'show_in_rest' => true,
			'rest_base'    => 'todos',
			'menu_icon'    => 'dashicons-list-view',
		) );
} );
