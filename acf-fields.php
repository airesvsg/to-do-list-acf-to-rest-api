<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( function_exists( 'register_field_group' ) ) {
	register_field_group( array(
		'id'     => 'acf_todo',
		'title'  => 'Todo',
		'fields' => array(
			array(
				'key'           => 'field_56929f3f6a98a',
				'label'         => 'Done',
				'name'          => 'done',
				'type'          => 'true_false',
				'message'       => '',
				'default_value' => 0,
				'show_in_rest'  => true,
				'edit_in_rest'  => true,
			),
		),
		'location' => array(
			array(
				array(
					'param'    => 'post_type',
					'operator' => '==',
					'value'    => 'todo',
					'order_no' => 0,
					'group_no' => 0,
				),
			),
		),
		'options' => array(
			'position'       => 'normal',
			'layout'         => 'no_box',
			'hide_on_screen' => array( 'the_content' ),
		),
		'menu_order' => 0,
	) );
}