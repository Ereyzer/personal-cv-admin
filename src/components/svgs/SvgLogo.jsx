

function SvgLogo(props) {
    return (
        <svg version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            stroke="currentColor"
            {...props}
        >

            <rect x="2" y="2" width="194" height="194" strokeWidth="3" />
            <rect x="8" y="8" width="182" height="182" strokeWidth="3" />

            <circle cx="64" cy="64" r="20" strokeWidth="2" />
            <ellipse cx="64" cy="64" rx="6" ry="19" strokeWidth="2" />
            <line x1="46" y1="54" x2="81" y2="54" strokeWidth="2" />
            <line x1="43" y1="64" x2="83" y2="64" strokeWidth="2" />
            <line x1="46" y1="74" x2="81" y2="74" strokeWidth="2" />

            <polygon points="62,62 90,69 69,90" strokeWidth="0" />
            <polygon points="70,70 78,72 72,78" strokeWidth="8" />
            <line x1="76" y1="76" x2="84" y2="84" strokeWidth="6" />


            <line x1="150" y1="46" x2="46" y2="150" strokeWidth="3" />


            <line x1="122" y1="111" x2="134" y2="111" strokeWidth="3" />
            <line x1="128" y1="111" x2="128" y2="145" strokeWidth="3" />
            <line x1="122" y1="145" x2="134" y2="145" strokeWidth="3" />
            Sorry, your browser does not support inline SVG.
        </svg>
    );
}

export default SvgLogo;