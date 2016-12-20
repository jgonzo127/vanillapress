/**
 * Helper file for extra helper functions
 */

/**
 * Main helper object
 */
var helpers = {};


/**
 * Creates a list item with a link inside for menus
 *
 * @param {Object} contentObj Page object to create menu item for
 * @return {Object} menuItemEl List item DOM object
 */
 helpers.createMenuItem = function( contentObj ) {

   var menuItemEl = document.createElement( 'li' );

   menuItemEl.appendChild( helpers.createLink( contentObj ) );

   return menuItemEl;

 };

/**
 * Creates link
 *
 * @param {Object} contentObj Content object to create link for
 * @return {Object} linkEl Link object
 */
helpers.createLink = function( contentObj ) {

  var linkEl = document.createElement( 'a' ),
     linkTitle = document.createTextNode( contentObj.title );

  if ( 'home' !== contentObj.slug ) {
    linkEl.href = '#' + contentObj.slug;
  } else {
    linkEl.href = '#';
  }
  linkEl.appendChild( linkTitle );

  return linkEl;

};

/**
 * Gets the main menu element
 * @return {Object} Main menu DOM object
 */
helpers.getMainMenuEl = function(){
 return document.querySelector( '#mainNav ul' );
};

/**
 * Gets page title from the DOM
 * @return {Object} Main page title DOM object
 */
helpers.getPageTitleEl = function() {

  return document.getElementById( 'pageTitle' );

};

/**
 * Gets page content from the DOM
 * @return {Object} Main content DOM object
 */
helpers.getPageContentEl = function() {

  return document.getElementById( 'pageContent' );

};

/**
 * Gets edit window toggle element.
 * @return {Object} Edit window toggle button
 */
helpers.getEditWindowToggle = function() {

  return document.getElementById( 'editorToggle' );

};

/**
 * Gets the edit window from the app.
 * @return {Object} Main edit window
 */
helpers.getEditWindow = function() {

  return document.getElementById( 'editor' );

};

/**
 * Gets the edit window from the app.
 * @return {Object} Main edit window
 */
helpers.getEditTitle = function() {

  return document.getElementById( 'editTitle' );

};

/**
 * Gets the edit window from the app.
 * @return {Object} Main edit window
 */
helpers.getEditContent = function() {

  return document.getElementById( 'editContent' );

};

/**
 * Gets the edit window from the app.
 * @return {Object} Main edit window
 */
helpers.getUpdateButton = function() {

  return document.getElementById( 'editUpdateBtn' );

};

