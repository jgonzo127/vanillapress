var editor = {};

editor.init = function() {
	editor.toggleEditorEvent();
	editor.updateOnSubmit();
	editor.checkForBlog();
}

editor.toggleEditWindow = function() {
	var editor = helpers.getEditWindow();
	var editorToggle = helpers.getEditWindowToggle();
	editor.classList.toggle( 'hidden' );
	editorToggle.classList.toggle( 'hidden' );
}

editor.toggleEditorEvent = function() {
	var editorToggle = helpers.getEditWindowToggle();
	editorToggle.addEventListener( 'click', editor.toggleEditWindow );
}

editor.getUpdatedContent = function() {
	var title = helpers.getEditTitle();
	var content = helpers.getEditContent();

	var newContent = {
			'title' : title.value,
			'content' : content.value,
		}

	return newContent;
}

editor.getLocalStore = function() {
	var originalSingleContent;
	var oldContent = JSON.parse( localStorage.getItem( 'vanillaPress' ) );

	var slug = router.getSlug();

	if( null === slug ) {
		slug = 'home';
	}

	originalSingleContent = model.getPost( slug );

	if( null === originalSingleContent ) {
	  originalSingleContent = model.getPage( slug );
	}

	return originalSingleContent;
}

editor.updateContent = function( e ) {
	var localContent;
	var newContent = editor.getUpdatedContent();
	var oldTitle = helpers.getPageTitleEl();
	var oldContent = helpers.getPageContentEl();
	e.preventDefault();

	if( newContent.title != '' ) {
		oldTitle.innerHTML= newContent.title;
	}

	if( newContent.content != '' ) {
		oldContent.innerHTML = newContent.content;
	}
}

editor.updateLocalStore = function( e ) {
	var oldContent = JSON.parse( localStorage.getItem( 'vanillaPress') );
	var originalSingleContent = editor.getLocalStore();
	var newContent = editor.getUpdatedContent();
	var id = originalSingleContent.id;
	var type = originalSingleContent.type;

	if( type === 'page' ) {
		for( i = 0; i < oldContent.pages.length; i++ ) {
			if (  newContent.title != '' && id == pages[i].id ) {
				oldContent.pages[i].title = newContent.title;
			}

			if ( newContent.content != '' && id == pages[i].id ) {
				oldContent.pages[i].content = newContent.content;
			}
		}
	}

	if( type === 'post' ) {
		for( i = 0; i < oldContent.posts.length; i++ ) {
			if (  newContent.title != '' && id == posts[i].id ) {
				oldContent.posts[i].title = newContent.title;
			}

			if ( newContent.content != '' && id == posts[i].id ) {
				oldContent.posts[i].content = newContent.content;
			}
		}
	}

	newData = localStorage.setItem( 'vanillaPress', JSON.stringify( oldContent ) );

  	model.getLocalStore( newData );

}

editor.checkForBlog = function() {
	var title = helpers.getEditTitle();
	var originalSingleContent = editor.getLocalStore();
	var content = helpers.getEditContent();
	var slug = originalSingleContent.slug;

	if( 'blog' === slug ) {
		title.setAttribute( 'disabled', true );
		content.setAttribute( 'disabled', true );
		title.value = '';
		content.value = '';
	} else {
		title.removeAttribute( 'disabled' );
		content.removeAttribute( 'disabled' );
	}
}

editor.checkForText = function() {
	var title = helpers.getEditTitle();
	var content = helpers.getEditContent();
	var submit = helpers.getUpdateButton();

	if( title.value.length != 0 || content.value.length != 0  ) {
		submit.classList.remove( 'no-input' );
	} else {
		submit.classList.add( 'no-input');
	}
}

editor.clearEditorInputs = function() {
	var title = helpers.getEditTitle();
	var content = helpers.getEditContent();
	title.value = '';
	content.value = '';
}

editor.checkForSaved = function( e ) {
	var title = helpers.getEditTitle();
	var submit = helpers.getUpdateButton();
	var content = helpers.getEditContent();
	var saved = true;

	if( title.value.length != 0 || content.value.length != 0 ) {
		if ( confirm('You have unsaved changes. Do you want to continue?')) {
		    saved = true;
		    submit.classList.add( 'no-input');
		    title.value = '';
		    content.value = '';
		} else {
		    saved = false;
		}
	}

	return saved;
}

editor.updateOnSubmit = function() {
	var submit = helpers.getUpdateButton();
	var title = helpers.getEditTitle();
	var content = helpers.getEditContent();

	title.addEventListener( 'keyup', editor.checkForText );
	content.addEventListener( 'keyup', editor.checkForText );
	submit.addEventListener( 'click', editor.updateContent );
	submit.addEventListener( 'click', editor.updateLocalStore );
	submit.addEventListener( 'click', editor.clearEditorInputs );
	submit.addEventListener( 'click', editor.checkForText );
	window.addEventListener( 'hashchange', editor.checkForBlog );
}


