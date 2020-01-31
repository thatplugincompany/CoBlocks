<?php
/**
 * Register CoBlocks Settings
 *
 * @package   @@pkg.title
 * @author    @@pkg.author
 * @link      @@pkg.author_uri
 * @license   @@pkg.license
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Main @@pkg.title Class
 *
 * @since 2.0.0
 */
class CoBlocks_Settings {
	/**
	 * This plugin's instance.
	 *
	 * @var CoBlocks_Settings
	 */
	private static $instance;

	/**
	 * Registers the plugin.
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new CoBlocks_Settings();
		}
	}

	/**
	 * The Constructor.
	 */
	public function __construct() {

		add_action( 'init', array( $this, 'register_settings' ) );

		if ( ! get_option( 'coblocks_custom_colors_controls_enabled' ) ) {
			add_theme_support( 'disable-custom-colors' );
		}

		if ( ! get_option( 'coblocks_gradient_presets_enabled' ) ) {
			add_theme_support( '__experimental-editor-gradient-presets', array() );
			add_theme_support( '__experimental-disable-custom-gradients', true );
		}

		add_action( 'init', array( $this, 'coblocks_settings_assets' ) );

	}

	/**
	 * Localize CoBlock Settings Status CoBlocks settings.
	 *
	 * @access public
	 */
	public function coblocks_settings_assets() {
		wp_localize_script(
			'coblocks-editor',
			'coblocksSettings',
			array(
				'coblocksSettings'      => get_option( 'coblocks_settings_panel_enabled' ),
				'coblocksSettingsNonce' => wp_create_nonce( 'wp_rest' ),
			)
		);
	}

	/**
	 * Register CoBlocks settings.
	 *
	 * @access public
	 */
	public function register_settings() {
		register_setting(
			'coblocks_typography_controls_enabled',
			'coblocks_typography_controls_enabled',
			array(
				'type'              => 'boolean',
				'description'       => __( 'Setting use to disable or enable typography controls across the site.', 'coblocks' ),
				'sanitize_callback' => null,
				'show_in_rest'      => true,
				'default'           => true,
			)
		);

		register_setting(
			'coblocks_custom_colors_controls_enabled',
			'coblocks_custom_colors_controls_enabled',
			array(
				'type'              => 'boolean',
				'description'       => __( 'Setting use to disable or enable custom color controls across the site.', 'coblocks' ),
				'sanitize_callback' => null,
				'show_in_rest'      => true,
				'default'           => true,
			)
		);

		register_setting(
			'coblocks_gradient_presets_enabled',
			'coblocks_gradient_presets_enabled',
			array(
				'type'              => 'boolean',
				'description'       => __( 'Setting use to disable or enable gradient controls and presets across the site.', 'coblocks' ),
				'sanitize_callback' => null,
				'show_in_rest'      => true,
				'default'           => true,
			)
		);

		register_setting(
			'coblocks_settings_panel_enabled',
			'coblocks_settings_panel_enabled',
			array(
				'type'              => 'boolean',
				'description'       => __( 'Setting use to disable or enable the CoBlock setting panel.', 'coblocks' ),
				'sanitize_callback' => null,
				'show_in_rest'      => true,
				'default'           => true,
			)
		);
	}
}

CoBlocks_Settings::register();
