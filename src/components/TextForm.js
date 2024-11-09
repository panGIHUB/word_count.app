/*

import React,{useState} from 'react'


export default function Textform(props) {
    const handleUpClick =() => {
        //console.log("Uppercase was clicked "+text);
        let newtext = text.toUpperCase();
        setText(newtext);
        //setText(" you have clicked on handleUpClick ")
    }

    const handleLoClick =() => {
        //console.log("Uppercase was clicked "+text);
        let newtext = text.toLowerCase();
        setText(newtext);
        //setText(" you have clicked on handleUpClick ")
    }

    const handleOnChange =(event) => {
        console.log("On change");
        setText(event.target.value);
    }
    const [text, setText] = useState(" ");
  setText("dschds f gdsfs");
    return (
        <>
    <div className='container'>
        <h1>{props.heading} - {text} </h1>
      <div class="mb-3">
  <label for="my-box" class="form-label"> Examle textarea </label>
  <textarea class="form-control"  value = {text} onChange ={handleOnChange}  id="my-Box" rows="9" > </textarea>
</div>
<button className ="btn btn-primary mx-1" onClick={handleUpClick}> Convert to Uppercase </button>
<button className ="btn btn-primary mx-1 " onClick={handleLoClick}> Convert to Lowercase </button>
    </div>
    <div className="conatiner my-3">
        <h1> Your text summery</h1>
        <p> {text.split(" ").length}  words and {text.length}  characters</p>
    <p> {0.008 * text.split(" ").length } Minutes read </p>
   <h2> Preview </h2>
   <p> {text}</p>
   </div>
    </>
  )
}

*/

//########################################
// line number 52 to line 124 are chnage
/*
import React, { useState } from 'react';

export default function Textform(props) {
    // const [text, setText] = useState("dschds f gdsfs");

    const handleUpClick = () => {
        let newtext = text.toUpperCase();
        setText(newtext);
    };

    const handleLoClick = () => {
        let newtext = text.toLowerCase();
        setText(newtext);
    };

    const handleClearClick = () => {
        let newtext = " ";
        setText(newtext);
    };

    const handleOnChange = (event) => {
        setText(event.target.value);
    };

    // for remove extra space between messages 
     const handleExtraSpace = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "))
     }
    

const handleCopy = () => {
    var text = document.getElementById("my-Box");
    text.select(); // Select the text in the textarea
    text.setSelectionRange(0, text.value.length); // For mobile compatibility
    navigator.clipboard.writeText(text.value) // Copy text to clipboard
        .then(() => {
            console.log("Text copied to clipboard!");
        })
        .catch((err) => {
            console.error("Could not copy text: ", err);
        });
};

    const[text,setText] = useState(' ');
    return (
        <>
            <div className='container'>
                <h1>{props.heading}</h1>
                <div className="mb-3">
                    <label htmlFor="my-box" className="form-label">Example textarea</label>
                    <textarea className="form-control" value={text} onChange={handleOnChange} id="my-Box" rows="9"></textarea>
                </div>
                <button className="btn btn-primary mx-1" onClick={handleUpClick}>Convert to Uppercase</button>
                <button className="btn btn-primary mx-1" onClick={handleLoClick}>Convert to Lowercase</button>
                <button className="btn btn-primary mx-1" onClick={handleClearClick}> Clear text </button>
                <button className="btn btn-primary mx-1" onClick={handleCopy}> Copy Text </button>
                <button className="btn btn-primary mx-1" onClick={handleExtraSpace}> Remove extra spaces </button>
            </div>
            
            <div className="container my-3">
                <h1>Your text summary</h1>
                <p>{text.split(" ").length} words and {text.length} characters</p>
                <p>{0.008 * text.split(" ").length} Minutes read</p>
                <h2>Preview</h2>
                <p>{text}</p>
            </div>
        </>
    );
}
*/

// add some extra code your own 

import React, { useState } from 'react';

export default function Textform(props) {
    const [text, setText] = useState(' ');
    const [history, setHistory] = useState([]);
    const [redoHistory, setRedoHistory] = useState([]);

    const handleUpClick = () => {
        updateHistory();
        let newText = text.toUpperCase();
        setText(newText);
    };

    const handleLoClick = () => {
        updateHistory();
        let newText = text.toLowerCase();
        setText(newText);
    };

    const handleClearClick = () => {
        updateHistory();
        setText('');
    };

    const handleOnChange = (event) => {
        setRedoHistory([]); // Clear redo history on new input
        setText(event.target.value);
    };

    const handleExtraSpace = () => {
        updateHistory();
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
    };

    const handleCopy = () => {
        var text = document.getElementById("my-Box");
        text.select();
        text.setSelectionRange(0, text.value.length);
        navigator.clipboard.writeText(text.value)
            .then(() => console.log("Text copied to clipboard!"))
            .catch((err) => console.error("Could not copy text: ", err));
    };

    const handleUndo = () => {
        if (history.length > 0) {
            setRedoHistory([text, ...redoHistory]);
            const previousText = history[history.length - 1];
            setHistory(history.slice(0, history.length - 1));
            setText(previousText);
        }
    };

    const handleRedo = () => {
        if (redoHistory.length > 0) {
            setHistory([...history, text]);
            const nextText = redoHistory[0];
            setRedoHistory(redoHistory.slice(1));
            setText(nextText);
        }
    };

    const updateHistory = () => {
        setHistory([...history, text]);
        setRedoHistory([]);
    };

    return (
        <>
            <div className='container' style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
                <h1>{props.heading}</h1>
                <div className="mb-3">
                    <label htmlFor="my-box" className="form-label">Example textarea</label>
                    <textarea className="form-control" value={text} onChange={handleOnChange} style={{ backgroundColor: props.mode === 'dark' ? 'gray' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }} id="my-Box" rows="9"></textarea>
                </div>
                <button className="btn btn-primary mx-1" onClick={handleUpClick}>Convert to Uppercase</button>
                <button className="btn btn-primary mx-1" onClick={handleLoClick}>Convert to Lowercase</button>
                <button className="btn btn-primary mx-1" onClick={handleClearClick}>Clear text</button>
                <button className="btn btn-primary mx-1" onClick={handleCopy}>Copy Text</button>
                <button className="btn btn-primary mx-1" onClick={handleExtraSpace}>Remove extra spaces</button>

                {/* Undo and Redo Icons */}
                <span
                    className={`mx-2 ${history.length === 0 ? 'text-muted' : ''}`}
                    onClick={handleUndo}
                    style={{ cursor: history.length > 0 ? 'pointer' : 'default' }}
                    title="Undo"
                >
                    <i className="fas fa-undo"></i>
                </span>
                <span
                    className={`mx-2 ${redoHistory.length === 0 ? 'text-muted' : ''}`}
                    onClick={handleRedo}
                    style={{ cursor: redoHistory.length > 0 ? 'pointer' : 'default' }}
                    title="Redo"
                >
                    <i className="fas fa-redo"></i>
                </span>
            </div>

            <div className="container my-3" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
                <h1>Your text summary</h1>
                <p>{text.split(" ").filter(word => word.length > 0).length} words and {text.length} characters</p>
                <p>{0.008 * text.split(" ").filter(word => word.length > 0).length} Minutes read</p>
                <h2>Preview</h2>
                <p>{text.length > 0 ? text : "Enter something in the above text-box to preview it here"}</p>
            </div>
        </>
    );
}



/*
import React, { useState } from 'react';
import { fetchDictionary, translateText } from '../helpers'; // Make sure the path is correct

export default function Textform(props) {
    const [text, setText] = useState('');
    const [history, setHistory] = useState([]);
    const [redoHistory, setRedoHistory] = useState([]);
    const [translatedText, setTranslatedText] = useState('');
    const [dictionaryDefinition, setDictionaryDefinition] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [targetLanguage, setTargetLanguage] = useState(''); // State for target language

    const handleUpClick = () => {
        updateHistory();
        let newText = text.toUpperCase();
        setText(newText);
    };

    const handleLoClick = () => {
        updateHistory();
        let newText = text.toLowerCase();
        setText(newText);
    };

    const handleClearClick = () => { 
        updateHistory();
        setText('');
        setTranslatedText(''); // Clear translation when text is cleared
        setDictionaryDefinition(''); // Clear definition when text is cleared
        setErrorMessage(''); // Clear any error messages
    };

    const handleOnChange = (event) => {
        setRedoHistory([]); // Clear redo history on new input
        setText(event.target.value);
        setTranslatedText(''); // Clear previous translation
        setDictionaryDefinition(''); // Clear previous definition
        setErrorMessage(''); // Clear previous error message
    };

    const handleExtraSpace = () => {
        updateHistory();
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
    };

    const handleCopy = () => {
        var textBox = document.getElementById("my-Box");
        textBox.select();
        textBox.setSelectionRange(0, textBox.value.length);
        navigator.clipboard.writeText(textBox.value)
            .then(() => console.log("Text copied to clipboard!"))
            .catch((err) => console.error("Could not copy text: ", err));
    };

    const handleUndo = () => {
        if (history.length > 0) {
            setRedoHistory([text, ...redoHistory]);
            const previousText = history[history.length - 1];
            setHistory(history.slice(0, history.length - 1));
            setText(previousText);
        }
    };

    const handleRedo = () => {
        if (redoHistory.length > 0) {
            setHistory([...history, text]);
            const nextText = redoHistory[0];
            setRedoHistory(redoHistory.slice(1));
            setText(nextText);
        }
    };

    const updateHistory = () => {
        setHistory([...history, text]);
        setRedoHistory([]);
    };

    const handleTranslate = async () => {
        try {
            const translated = await translateText(text, targetLanguage);
            setTranslatedText(translated);
            setErrorMessage(''); // Clear any previous error messages
        } catch (error) {
            console.error(error);
            setErrorMessage('Translation failed. Please try again.');
        }
    };

    const handleDictionary = async () => {
        try {
            const definition = await fetchDictionary(text);
            setDictionaryDefinition(definition);
            setErrorMessage(''); // Clear any previous error messages
        } catch (error) {
            console.error(error);
            setErrorMessage('Error fetching definition. Please try again.');
        }
    };

    return (
        <>
            <div className='container' style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
                <h1>{props.heading}</h1>
                <div className="mb-3">
                    <label htmlFor="my-box" className="form-label">Example textarea</label>
                    <textarea 
                        className="form-control" 
                        value={text} 
                        onChange={handleOnChange} 
                        style={{ backgroundColor: props.mode === 'dark' ? 'gray' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }} 
                        id="my-Box" 
                        rows="9">
                    </textarea>
                </div>
                <button className="btn btn-primary mx-1" onClick={handleUpClick}>Convert to Uppercase</button>
                <button className="btn btn-primary mx-1" onClick={handleLoClick}>Convert to Lowercase</button>
                <button className="btn btn-primary mx-1" onClick={handleClearClick}> Clear text </button>
                <button className="btn btn-primary mx-1" onClick={handleCopy}> Copy Text </button>
                <button className="btn btn-primary mx-1" onClick={handleExtraSpace}> Remove extra spaces </button>

                 Undo and Redo Icons 
                <span 
                    className={`mx-2 ${history.length === 0 ? 'text-muted' : ''}`} 
                    onClick={handleUndo} 
                    style={{ cursor: history.length > 0 ? 'pointer' : 'default' }}
                    title="Undo">
                    <i className="fas fa-undo"></i>
                </span>
                <span 
                    className={`mx-2 ${redoHistory.length === 0 ? 'text-muted' : ''}`} 
                    onClick={handleRedo} 
                    style={{ cursor: redoHistory.length > 0 ? 'pointer' : 'default' }}
                    title="Redo">
                    <i className="fas fa-redo"></i>
                </span>
                
             Translation Input 
                <input 
                    type="text" 
                    placeholder="Enter target language code (e.g., 'es' for Spanish, 'fr' for French)" 
                    value={targetLanguage} 
                    onChange={(e) => setTargetLanguage(e.target.value)} 
                    className="form-control my-2" 
                />

                <button onClick={handleTranslate} className="btn btn-primary mx-1">Translate</button>
                <button onClick={handleDictionary} className="btn btn-primary mx-1">Get Dictionary Definition</button>

                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>

            <div className="container my-3" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
                <h1>Your text summary</h1>
                <p>{text.split(" ").filter(word => word.length > 0).length} words and {text.length} characters</p>
                <p>{0.008 * text.split(" ").filter(word => word.length > 0).length} Minutes read</p>
                <h2>Preview</h2>
                <p>{text.length > 0 ? text : "Enter something in the above text-box to preview it here"}</p>

                <h2>Translated Text</h2>
                <p>{translatedText}</p>
                <h2>Dictionary Definition</h2>
                <p>{dictionaryDefinition}</p>
            </div>
        </>
    );
}
*/

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

/*
import React, { useState } from 'react';

export default function Textform(props) {
    const [text, setText] = useState(" ");

    const handleUpClick = () => {
        let newtext = text.toUpperCase();
        setText(newtext);
    };

    const handleLoClick = () => {
        let newtext = text.toLowerCase();
        setText(newtext);
    };

    const handleOnChange = (event) => {
        setText(event.target.value);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        alert("Text copied to clipboard!");
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([text], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "textutils_output.txt";
        document.body.appendChild(element);
        element.click();
    };

    // Calculate word, sentence, and line counts
    const wordCount = text.trim().split(/\s+/).length;
    const sentenceCount = text.split(/[.!?]+/).filter(sentence => sentence.length > 0).length;
    const lineCount = text.split(/\n/).length;

    return (
        <>
            <div className='container'>
                <h1>{props.heading}</h1>
                <div className="mb-3">
                    <label htmlFor="my-box" className="form-label">Example textarea</label>
                    <textarea className="form-control" value={text} onChange={handleOnChange} id="my-Box" rows="9"></textarea>
                </div>
                <button className="btn btn-primary mx-1" onClick={handleUpClick}>Convert to Uppercase</button>
                <button className="btn btn-primary mx-1" onClick={handleLoClick}>Convert to Lowercase</button>
                <button className="btn btn-primary mx-1" onClick={handleCopy}>Copy to Clipboard</button>
                <button className="btn btn-primary mx-1" onClick={handleDownload}>Download Text</button>
            </div>
            <div className="container my-3">
                <h1>Your text summary</h1>
                <p>{wordCount} words, {text.length} characters</p>
                <p>{sentenceCount} sentences, {lineCount} lines</p>
                <p>{(0.008 * wordCount).toFixed(2)} Minutes read</p>
                <h2>Preview</h2>
                <p>{text}</p>
            </div>
        </>
    );
}
*/


//$$$$$$$$$$$$$$$$$$$$$$
/*
import React, { useState, useEffect } from 'react';

export default function Textform(props) {
    const [text, setText] = useState("Enter your text here");
    const [isActivityOn, setIsActivityOn] = useState(true);
    const [isAutoSaveOn, setIsAutoSaveOn] = useState(false);
    const [lastSavedText, setLastSavedText] = useState("");
    
    useEffect(() => {
        if (isAutoSaveOn) {
            const interval = setInterval(() => {
                setLastSavedText(text);
                console.log("Auto-saved document");
            }, 30000); // Auto-save every 30 seconds
            return () => clearInterval(interval);
        }
    }, [isAutoSaveOn, text]);

    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText);
    };

    const handleLoClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
    };

    const handleClearText = () => {
        setText("");
    };

    const handleCleanText = () => {
        let cleanedText = text.replace(/[^a-zA-Z0-9 .,?!\n]/g, "").replace(/\n+/g, "\n");
        setText(cleanedText.trim());
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        alert("Text copied to clipboard!");
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([text], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "textutils_output.txt";
        document.body.appendChild(element);
        element.click();
    };

    const handleOnChange = (event) => {
        setText(event.target.value);
    };

    // Calculate counts and keyword density
    const wordCount = text.trim().split(/\s+/).filter(word => word).length;
    const sentenceCount = text.split(/[.!?]+/).filter(sentence => sentence.trim()).length;
    const lineCount = text.split(/\n/).length;

    // Function to calculate keyword density
    const getKeywordDensity = () => {
        let words = text.toLowerCase().split(/\s+/).filter(word => word);
        let wordFreq = {};
        words.forEach(word => wordFreq[word] = (wordFreq[word] || 0) + 1);
        return Object.entries(wordFreq).map(([word, count]) => ({
            word,
            count,
            density: ((count / wordCount) * 100).toFixed(2) + "%"
        }));
    };

    return (
        <>
            <div className='container'>
                <h1>{props.heading}</h1>
                <div className="mb-3">
                    <label htmlFor="my-box" className="form-label">Example textarea</label>
                    <textarea className="form-control" value={text} onChange={handleOnChange} id="my-Box" rows="9"></textarea>
                </div>

               // { Buttons }
                <button className="btn btn-primary mx-1" onClick={handleUpClick}>Convert to Uppercase</button>
                <button className="btn btn-primary mx-1" onClick={handleLoClick}>Convert to Lowercase</button>
                <button className="btn btn-primary mx-1" onClick={handleCopy}>Copy to Clipboard</button>
                <button className="btn btn-primary mx-1" onClick={handleDownload}>Download Text</button>
                <button className="btn btn-primary mx-1" onClick={handleClearText}>Clear</button>
                <button className="btn btn-primary mx-1" onClick={handleCleanText}>Clean Text</button>

               // Options *
                <div className="my-3">
                    <h2>Options</h2>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={isActivityOn}
                                onChange={() => setIsActivityOn(!isActivityOn)}
                            />{" "}
                            Activity (Track word and character count)
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={isAutoSaveOn}
                                onChange={() => setIsAutoSaveOn(!isAutoSaveOn)}
                            />{" "}
                            Auto-Save (Every 30 seconds)
                        </label>
                    </div>
                </div>
            </div>

            // Display Activity Info 
            {isActivityOn && (
                <div className="container my-3">
                    <h1>Text Summary</h1>
                    <p>{wordCount} words, {text.length} characters</p>
                    <p>{sentenceCount} sentences, {lineCount} lines</p>
                    <p>{(0.008 * wordCount).toFixed(2)} minutes read</p>
                </div>
            )}

           // Display Keyword Density 
            <div className="container my-3">
                <h2>Keyword Density</h2>
                <ul>
                    {getKeywordDensity().map(({ word, count, density }) => (
                        <li key={word}>
                            {word}: {count} occurrences ({density})
                        </li>
                    ))}
                </ul>
            </div>

          // Preview 
            <div className="container my-3">
                <h2>Preview</h2>
                <p>{text}</p>
                <p><i>Last saved version: "{lastSavedText}"</i></p>
            </div>
        </>
    );
}

*/

/*
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Textform(props) {
    const [text, setText] = useState("Enter your text here");
    const [isActivityOn, setIsActivityOn] = useState(true);
    const [isAutoSaveOn, setIsAutoSaveOn] = useState(false);
    const [isCaseOn, setIsCaseOn] = useState(true);
    const [isCleanTextOn, setIsCleanTextOn] = useState(false);
    const [isClearOn, setIsClearOn] = useState(true);
    const [isDownloadOn, setIsDownloadOn] = useState(false);
    
    useEffect(() => {
        if (isAutoSaveOn) {
            const interval = setInterval(() => {
                console.log("Auto-saved document");
            }, 30000);
            return () => clearInterval(interval);
        }
    }, [isAutoSaveOn, text]);

    const handleOnChange = (event) => {
        setText(event.target.value);
    };

    return (
        <>
            <div className="container">
                <ul className="nav nav-tabs my-3" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a className="nav-link active" id="general-tab" data-bs-toggle="tab" href="#general" role="tab" aria-controls="general" aria-selected="true">General</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="details-tab" data-bs-toggle="tab" href="#details" role="tab" aria-controls="details" aria-selected="false">Details</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="keywordDensity-tab" data-bs-toggle="tab" href="#keywordDensity" role="tab" aria-controls="keywordDensity" aria-selected="false">Keyword Density</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="activity-tab" data-bs-toggle="tab" href="#activity" role="tab" aria-controls="activity" aria-selected="false">Activity</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="buttons-tab" data-bs-toggle="tab" href="#buttons" role="tab" aria-controls="buttons" aria-selected="false">Buttons</a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    // General Tab 
                    <div className="tab-pane fade show active" id="general" role="tabpanel" aria-labelledby="general-tab">
                        <h2>General</h2>
                        <textarea className="form-control my-3" value={text} onChange={handleOnChange} rows="9"></textarea>
                    </div>

                    // Details Tab 
                    <div className="tab-pane fade" id="details" role="tabpanel" aria-labelledby="details-tab">
                        <h2>Details</h2>
                        // Add details functionality here 
                    </div>

                   // Keyword Density Tab 
                    <div className="tab-pane fade" id="keywordDensity" role="tabpanel" aria-labelledby="keywordDensity-tab">
                        <h2>Keyword Density</h2>
                        // Add keyword density functionality here 
                    </div>

                   // Activity Tab 
                    <div className="tab-pane fade" id="activity" role="tabpanel" aria-labelledby="activity-tab">
                        <h2>Activity</h2>
                        <p>Word Count: {text.split(/\s+/).filter((word) => word).length}</p>
                        <p>Character Count: {text.length}</p>
                    </div>

                    // Buttons Tab 
                    <div className="tab-pane fade" id="buttons" role="tabpanel" aria-labelledby="buttons-tab">
                        <h2>Buttons</h2>
                        <div className="form-check form-switch">
                            <label className="form-check-label" htmlFor="activitySwitch">Activity</label>
                            <input className="form-check-input" type="checkbox" id="activitySwitch" checked={isActivityOn} onChange={() => setIsActivityOn(!isActivityOn)} />
                        </div>
                        <div className="form-check form-switch">
                            <label className="form-check-label" htmlFor="autoSaveSwitch">Auto-Save</label>
                            <input className="form-check-input" type="checkbox" id="autoSaveSwitch" checked={isAutoSaveOn} onChange={() => setIsAutoSaveOn(!isAutoSaveOn)} />
                        </div>
                        <div className="form-check form-switch">
                            <label className="form-check-label" htmlFor="caseSwitch">Case</label>
                            <input className="form-check-input" type="checkbox" id="caseSwitch" checked={isCaseOn} onChange={() => setIsCaseOn(!isCaseOn)} />
                        </div>
                        <div className="form-check form-switch">
                            <label className="form-check-label" htmlFor="cleanTextSwitch">Clean Text</label>
                            <input className="form-check-input" type="checkbox" id="cleanTextSwitch" checked={isCleanTextOn} onChange={() => setIsCleanTextOn(!isCleanTextOn)} />
                        </div>
                        <div className="form-check form-switch">
                            <label className="form-check-label" htmlFor="clearSwitch">Clear</label>
                            <input className="form-check-input" type="checkbox" id="clearSwitch" checked={isClearOn} onChange={() => setIsClearOn(!isClearOn)} />
                        </div>
                        <div className="form-check form-switch">
                            <label className="form-check-label" htmlFor="downloadSwitch">Download</label>
                            <input className="form-check-input" type="checkbox" id="downloadSwitch" checked={isDownloadOn} onChange={() => setIsDownloadOn(!isDownloadOn)} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

*/