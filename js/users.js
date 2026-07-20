class user {
    constructor(name) {
        this.name = name;
        this.uid = gUsers.length;
        this.opaqueBackground = true;
        this.toOpen = true;
        this.delete = false;
        this.aniSpeed = 0.01;
        this.ease = 0.075;
        this.color = '#00b32a';
        this.textColor = '#f30505';
        this.textFont = "Hyperspace";
        this.backgroundColor = '#044114';
        this.selCity = locations[gUsers.length].address.country;
        this.textDisplayChar = 0;
        this.typingEffect = true;
        this.drawCities = false;
        this.drawNodes = nodes;
        this.text = "This is\na much longer string with more info that needs to auto wrap. THWHE eiojeie eojie oej";

    }
}