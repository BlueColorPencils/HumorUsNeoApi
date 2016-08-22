n.name	n.imgurID
1	GaCKufm
2	OJ0q3SF
3	kZ3eWo2
4	H9hLWtA
5	tgoJI3X
6	EjhkDjO
7	gX00ou9
8	lA2M0
9	hfq1kmi
10	WpuK6yr



CREATE(a:Picture
{

{
    "imgurID": "GaCKufm",
    "title": "There's two types of kids on the first day of school..",
    "name": 1,
    "description": null,
    "link": "http://i.imgur.com/GaCKufm.jpg",
    "dateAdded": "1471827053360",
    "type": "image/jpeg"
  }

{
    "imgurID": "OJ0q3SF",
    "title": "I don't live in a great a neighborhood. Thanks, USPS.",
    "name": 2,
    "description": null,
    "link": "http://i.imgur.com/OJ0q3SF.jpg",
    "dateAdded": "1471827053360",
    "type": "image/jpeg"

  }

{
    "imgurID": "kZ3eWo2",
    "title": "Getcha Dad joke here",
    "name": 3,
    "description": null,
    "link": "http://i.imgur.com/kZ3eWo2.png",
    "dateAdded": "1471827053360",
    "type": "image/jpeg"

}

{
    "imgurID": "H9hLWtA",
    "title": "the end of racism!",
    "name": 4,
    "description": null,
    "link": "http://i.imgur.com/H9hLWtA.jpg",
    "dateAdded": "1471827053360",
    "type": "image/jpeg"

  }

{
    "imgurID": "tgoJI3X",
    "title": "There's two types of horses in the stable",
    "name": 5,
    "description": null,
    "link": "http://i.imgur.com/tgoJI3X.jpg",
    "dateAdded": "1471827053360",
    "type": "image/jpeg"

  }

{
    "imgurID": "EjhkDjO",
    "title": "They caught me, guys...",
    "name": 6,
    "description": null,
    "link": "http://i.imgur.com/EjhkDjO.jpg",
    "dateAdded": "1471827053360",
    "type": "image/jpeg"

  }

{
    "imgurID": "gX00ou9",
    "title": "My mom was overjoyed to learn about Pokémon Go from my nephew",
    "name": 7,
    "description": null,
    "link": "http://i.imgur.com/gX00ou9.jpg",
    "dateAdded": "1471827053360",
    "type": "image/jpeg"

  }

{
    "imgurID": "lA2M0",
    "title": "Need a loan?",
    "name": 8,
    "description": null,
    "link": "http://i.imgur.com/lA2M0.jpg",
    "dateAdded": "1471827053360",
    "type": "image/jpeg"

  }

{
    "imgurID": "hfq1kmi",
    "title": "I'm not saying they won't do this",
    "name": 9,
    "description": null,
    "link": "http://i.imgur.com/hfq1kmi.png",
    "dateAdded": "1471827053360",
    "type": "image/jpeg"

  }
  {
    "imgurID":"WpuK6yr",
    "title": "Roommate found the greatest thing for his bunny at work yesterday",
    "name": 10,
    "description": null,
    "link": "http://i.imgur.com/WpuK6yr.jpg",
    "dateAdded": "1471827053360",
    "type": "image/jpeg"

  }
}




CREATE (a:User
{
  "fbID": "11111111",
  "name": "Cristal Tay",
  "birthday": null,
  "age": 21,
  "photo": "https://scontent.xx.fbcdn.net/v/t1.0-1/c0.0.50.50/p50x50/13010630_10206859226907492_8864963793655632175_n.jpg?oh=a60ff3a2b787e8a791901d051147f2c0&oe=5857BD34",
  "gender": "female",
  "preferredGender": null,
  "preferredLocationKM": null,
  "preferredAgeMin": null,
  "preferredAgeMax": null,
  "lat": 47.6062100,
  "long": -122.3320710,
  "dateJoined": null,
  "dateLastLogin": null,
  "description": "hi I am cristal"
}
)
{
  "fbID": "22222222",
  "name": "Ann Banan",
  "birthday": null,
  "age": 22,
  "photo": "http://i.imgur.com/SSADow0.jpg",
  "gender": "female",
  "preferredGender": null,
  "preferredLocationKM": null,
  "preferredAgeMin": null,
  "preferredAgeMax": null,
  "lat": 47.6062100,
  "long": -122.3320710,
  "dateJoined": null,
  "dateLastLogin": null,
  "description": null
}
)

CREATE (c:User
{
  "fbID": "33333333",
  "name": "Dan Dude",
  "birthday": null,
  "age": 24,
  "photo": "http://i.imgur.com/vykoKV9.jpg",
  "gender": "male",
  "preferredGender": null,
  "preferredLocationKM": null,
  "preferredAgeMin": null,
  "preferredAgeMax": null,
  "lat": 47.6062100,
  "long": -122.3320710,
  "dateJoined": null,
  "dateLastLogin": null,
  "description": null
}
)

CREATE (d:User
{
  "fbID": "44444444",
  "name": "Michael Cera",
  "birthday": null,
  "age": 33,
  "photo": "http://i.imgur.com/BhecDWJ.jpg",
  "gender": "male",
  "preferredGender": null,
  "preferredLocationKM": null,
  "preferredAgeMin": null,
  "preferredAgeMax": null,
  "lat": 47.6062100,
  "long": -122.3320710,
  "dateJoined": null,
  "dateLastLogin": null,
  "description": null
}
)

CREATE (e:User
{
  "fbID": "55555555",
  "name": "Rando L Hm",
  "birthday": null,
  "age": 30,
  "photo": "http://i.imgur.com/vttCbSb.png",
  "gender": "male",
  "preferredGender": null,
  "preferredLocationKM": null,
  "preferredAgeMin": null,
  "preferredAgeMax": null,
  "lat": null,
  "long": null,
  "dateJoined": null,
  "dateLastLogin": null,
  "description": null
}
)
