/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import { MultiRootEditor as MultiRootEditorBase } from '@ckeditor/ckeditor5-editor-multi-root';

import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { Heading } from '@ckeditor/ckeditor5-heading';
import {
  Image,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  PictureEditing,
} from '@ckeditor/ckeditor5-image';
import { Indent } from '@ckeditor/ckeditor5-indent';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';

export class MultiRootEditor extends MultiRootEditorBase {
  public static override builtinPlugins = [
    Essentials,
    Autoformat,
    Bold,
    Italic,
    Heading,
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    Indent,
    Paragraph,
    PictureEditing,
    TextTransformation,
  ];

  public static override defaultConfig = {
    toolbar: {
      items: [
        'undo',
        'redo',
        '|',
        'heading',
        '|',
        'bold',
        'italic',
        '|',
        'link',
        'uploadImage',
        'insertTable',
        'blockQuote',
        'mediaEmbed',
        '|',
        'bulletedList',
        'numberedList',
        'outdent',
        'indent',
      ],
    },
    image: {
      toolbar: [
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side',
        '|',
        'toggleImageCaption',
        'imageTextAlternative',
      ],
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
    // This value must be kept in sync with the language defined in webpack.config.js.
    language: 'en',
  };
}
