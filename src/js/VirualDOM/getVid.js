function vid(){
    let id = vid.id || 1000; 

    vid.id = id + 1; 

    return id;
}

module.exports = vid; 
