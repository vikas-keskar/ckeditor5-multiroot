import { AfterViewInit, Component, OnInit, VERSION } from '@angular/core';
// import { MultiRootEditor } from '@ckeditor/ckeditor5-editor-multi-root';
import { MultiRootEditor } from './MultiRootEditor';
import { EditorWatchdog } from '@ckeditor/ckeditor5-watchdog';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  randomTextFields = [];
  config: any = {};
  watchdog: EditorWatchdog;
  constructor() {
    function randomIntFromInterval(min, max) {
      // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function generateRandomText(numParagraphs, numSentencesPerParagraph) {
      const words = [
        'lorem',
        'ipsum',
        'dolor',
        'sit',
        'amet',
        'consectetur',
        'adipiscing',
        'elit',
        'sed',
        'do',
        'eiusmod',
        'tempor',
        'incididunt',
        'ut',
        'labore',
        'et',
        'dolore',
        'magna',
        'aliqua',
      ];
      const paragraphs = [];

      for (let p = 0; p < numParagraphs; p++) {
        const sentences = [];

        for (let i = 0; i < numSentencesPerParagraph; i++) {
          const numWords = Math.floor(Math.random() * 10) + 5;
          const sentenceWords = [];

          for (let j = 0; j < numWords; j++) {
            const randomIndex = Math.floor(Math.random() * words.length);
            sentenceWords.push(words[randomIndex]);
          }

          const sentence = sentenceWords.join(' ') + '.';
          sentences.push(sentence.charAt(0).toUpperCase() + sentence.slice(1));
        }

        paragraphs.push(sentences.join(' '));
      }

      return paragraphs.join('\n\n');
    }

    for (let i = 0; i < 3000; i++) {
      this.randomTextFields.push({
        id: i,
        text: generateRandomText(
          randomIntFromInterval(1, 3),
          randomIntFromInterval(5, 8)
        ),
      });
    }
  }

  onReady(editor) {
    // editor.ui
    //   .getEditableElement()
    //   .parentElement.insertBefore(
    //     editor.ui.view.toolbar.element,
    //     editor.ui.getEditableElement()
    //   );
    // editor.setData(this.randomTextFields[0].text);
  }

  ngOnInit(): void {
    // this.config = {
    //   placeholder: 'Type the content here',
    //   plugins: [],
    //   toolbar: {
    //     items: [
    //       'undo',
    //       'redo',
    //       'heading',
    //       '|',
    //       'fontSize',
    //       'fontFamily',
    //       '|',
    //       'fontColor',
    //       'fontBackgroundColor',
    //       'highlight',
    //       '|',
    //       'bold',
    //       'italic',
    //       'underline',
    //       'strikethrough',
    //       'superscript',
    //       'subscript',
    //       'removeFormat',
    //       'findAndReplace',
    //       '|',
    //       'alignment',
    //       '|',
    //       'numberedList',
    //       'bulletedList',
    //       'todoList',
    //       '|',
    //       'outdent',
    //       'indent',
    //       '|',
    //       'imageUpload',
    //       'imageInsert',
    //       'insertTable',
    //       'mediaEmbed',
    //       '|',
    //       'horizontalLine',
    //       'link',
    //       'blockQuote',
    //       'code',
    //       'codeBlock',
    //       'htmlEmbed',
    //       'pageBreak',
    //       'specialCharacters',
    //       //'sourceEditing',
    //       //'restrictedEditingException'
    //     ],
    //     shouldNotGroupWhenFull: true,
    //   },
    //   language: 'en',
    //   image: {
    //     toolbar: [
    //       'imageTextAlternative',
    //       'imageStyle:inline',
    //       'imageStyle:block',
    //       'imageStyle:side',
    //       'linkImage',
    //     ],
    //   },
    //   table: {
    //     contentToolbar: [
    //       'tableColumn',
    //       'tableRow',
    //       'mergeTableCells',
    //       'tableCellProperties',
    //       'tableProperties',
    //     ],
    //   },
    //   removePlugins: ['MediaEmbedToolbar'],
    // };
  }

  ngAfterViewInit() {
    let records = {};
    let data = {};

    // for (let field of this.randomTextFields) {
    //   records[`editor_${field.id}`] = document.querySelector(
    //     '#editor_' + field.id
    //   );
    //   data[`editor_${field.id}`] = `<p>${field.text}</p>`;
    // }

    this.getEditor(records);

    this.watchdog.on('stateChange', (event) => {
      if (this.watchdog.state === 'ready') {
        console.log('Setting editor data');
        // window.editor.setData(data);
        for (let field of this.randomTextFields) {
          records[`editor_${field.id}`] = document.querySelector(
            '#editor_' + field.id
          );
          data[`editor_${field.id}`] = `<p>${field.text}</p>`;
          // window.editor.addRoot(`editor_${field.id}`, { data: field.text });
        }
      }
    });
  }

  getEditor(records) {
    this.watchdog = new EditorWatchdog(MultiRootEditor);

    this.watchdog.setCreator((elements, config) => {
      return MultiRootEditor.create(elements as any, config).then((editor) => {
        // window.editor = editor;
        editor.on('addRoot', (evt, root) => {
          const editableElement = editor.createEditable(root);
          document.querySelector('#editors').appendChild(editableElement);
        });
        // for (let field of this.randomTextFields) {
        //   editor.addRoot(`editor_${field.id}`, {
        //     data: field.text,
        //     isLocked: false,
        //   });
        // }

        document
          .querySelector('#toolbar')
          .appendChild(editor.ui.view.toolbar.element);
        // Prevent closing the tab when any action is pending.
        editor.ui.view.listenTo(window, 'beforeunload', (evt, domEvt) => {
          if (editor.plugins.get('PendingActions').hasAny) {
            domEvt.preventDefault();
            domEvt.returnValue = true;
          }
        });

        return editor;
      });
    });

    this.watchdog.setDestructor((editor) => {
      document
        .querySelector('#toolbar')
        .removeChild(editor.ui.view.toolbar.element);

      return editor.destroy();
    });
    this.watchdog.create({});
  }

  name = 'Angular ' + VERSION.major;
}
