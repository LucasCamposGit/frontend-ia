export default function Examples({ display_example }) {
    return(
    <div style={display_example} className="container-examples">
        <div>
            <h1>Examples</h1>
            <div>"Explain quantum computing in simple terms" </div>
            <div>"Got any creative idea for a birthday?" </div>
            <div>"Explain quantum computing in simple terms" </div>
        </div>
        <div>
            <h1>Capabilities</h1>
            <div>Remember what user said earlier in the conversation </div>
            <div>Allows user to provide follow-up corrections </div>
            <div>Trained to decline inappropriate requests </div>
        </div>
        <div>
            <h1>Limitations</h1>
            <div>May occasionally generate incorrect information </div>
            <div>May occasionally produce harmful instructions or biased content </div>
            <div>Limited knowledge of world and events after 2021 </div>
        </div>
    </div>
    );
}