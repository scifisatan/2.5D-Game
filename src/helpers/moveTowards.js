export function moveTorwards(person, destinationPosition, speed){
    let distanceToTravelX = destinationPosition.x - person.position.x;
    let distanceToTravelY = destinationPosition.y - person.position.y;
    
    
    let distance = Math.sqrt(distanceToTravelX * distanceToTravelX + distanceToTravelY * distanceToTravelY);

    if(distance < speed){
        person.position.x = destinationPosition.x;
        person.position.y = destinationPosition.y;
       
    } else {
        let normalizedX = distanceToTravelX / distance;
        let normalizedY = distanceToTravelY / distance;

        person.position.x += normalizedX * speed;
        person.position.y += normalizedY * speed;

        distanceToTravelX = destinationPosition.x - person.position.x;
        distanceToTravelY = destinationPosition.y - person.position.y;
        distance = Math.sqrt(distanceToTravelX * distanceToTravelX + distanceToTravelY * distanceToTravelY);
    }

    return distance;

}