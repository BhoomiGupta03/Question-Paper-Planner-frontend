import React from 'react';

export default function Main() {
    return (
        <div id="main">
            <section id="sub-name">
                <h1>Create Your Question Paper</h1>
                
                <div className="sub">
                    <label>Enter Subject:</label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder="Subject"
                        required
                    />
                </div>
                
                <div className="unit">
                    <label>Enter Unit:</label>
                    <input
                        type="text"
                        id="unit"
                        name="unit"
                        placeholder="Unit"
                        required
                    />
                </div>
                
                <div className="quest">
                    <label>Enter Question:</label>
                    <input
                        type="text"
                        id="question"
                        name="question"
                        placeholder="Question"
                        required
                    />
                </div>
            </section>
            
            <section id="gen">
                <div className="gen-pdf">
                    <button onClick={() => console.log("Generating PDF...")}>
                        Download PDF
                    </button>
                </div>
                
                <div className="gen-more-ques">
                    <button onClick={() => console.log("Generating more questions...")}>
                        Generate More Questions 
                    </button>
                </div>
            </section>
        </div>
    );
}
