
const events = [
    {
        "id": "d3eafa10-a745-5597-94cb-39521449a60e",
        "name": "La Bande des idées #1",
        "date_time": "2014-11-05T19:30:00.000Z",
        "bd_ids": [
            "7d723523-0d8a-5c4f-a040-8ff0cca2bc83",
            "403fb2b2-7948-5aa1-9cbe-2e9e468a9c05",
            "d0dbce49-10b1-5c8d-8c0e-20f9c9c83c98",
            "79894bab-2308-5561-b5ba-b688a26f6672"
        ],
        "fb_event": "https://www.facebook.com/events/1548027528761948/"
    },
    {
        "id": "d5f75c97-9c89-5bba-b8ae-3a252399c8f9",
        "name": "La Bande des idées #2",
        "date_time": "2014-12-03T19:30:00.000Z",
        "bd_ids": [
            "995dd270-3ead-51df-a96b-919cd922cbea",
            "76b4d2f1-cdb5-5aae-9479-3daf719d8adb",
            "06175f53-82fc-5df0-a3d6-33be607df9c8",
            "8f57610f-1014-5596-8015-17b94899cd58"
        ],
        "fb_event": "https://scontent.fcdg1-1.fna.fbcdn.net/v/t1.0-9/10730999_892432464133133_8046229807596859137_n.jpg?_nc_cat=105&_nc_ht=scontent.fcdg1-1.fna&oh=2959cf0e7720dbab88e5173961891080&oe=5D2405FB"
    },
    {
        "id": "defb09ef-c4e5-542b-acdf-e0b5029140ba",
        "name": "La Bande des idées #3",
        "date_time": "2015-02-11T19:30:00.000Z",
        "bd_ids": [
            "dc370931-0191-5023-a121-09e365903d81",
            "4c2f3bd9-177e-561b-a197-3579528230ae",
            "75fc73a4-84d6-50f0-99d9-b7445c392bb8",
            "979cc21c-4c87-5805-b5f5-6f5f3f1606d2"
        ],
        "fb_event": "https://scontent.fcdg1-1.fna.fbcdn.net/v/t1.0-9/1979505_940848045958241_3510145053302013663_n.jpg?_nc_cat=106&_nc_ht=scontent.fcdg1-1.fna&oh=8269b537190194727d2638704f3d0445&oe=5D19A617"
    },
    {
        "id": "f22d82a6-0cbb-545d-ac4e-4d6766dd929b",
        "name": "La Bande des idées #4",
        "date_time": "2015-03-10T19:30:00.000Z",
        "bd_ids": [
            "beee135e-1fed-5a0c-9083-dde2ebaec54d",
            "913d07b5-d10c-59ba-9f1d-9a2b4c3ad13d",
            "db8922f2-954d-5063-9ca0-699e952b7520",
            "3da21605-8214-54c2-b22c-e217a9c9ce93"
        ],
        "fb_event": "https://scontent.fcdg1-1.fna.fbcdn.net/v/t1.0-9/11034300_957113717665007_9217857601948649037_n.jpg?_nc_cat=103&_nc_ht=scontent.fcdg1-1.fna&oh=81f0d6de3f3cdbfddf2b249453cd5ce6&oe=5D1D555D"
    },
    {
        "id": "f9362d2e-7799-5314-8d0f-7bfbebbc45b6",
        "name": "La Bande des idées #5",
        "date_time": "2015-04-07T19:30:00.000Z",
        "bd_ids": [
            "8912ab3c-bf35-5595-bdb9-3c6357a2e7b9",
            "43bbd0e5-e692-5e43-950a-eb10bd288972",
            "f5bfa282-0bba-5c25-819a-7189c4fa979f",
            "38c7eb79-a784-51a2-bf4e-94b788834ea9"
        ],
        "fb_event": "https://scontent.fcdg1-1.fna.fbcdn.net/v/t1.0-9/10474535_973957882647257_8113608325421000787_n.jpg?_nc_cat=110&_nc_ht=scontent.fcdg1-1.fna&oh=f15c6898e1958ad5ffa9c6a534a95f4c&oe=5D26E1F5"
    },
    {
        "id": "5530f067-a32c-51e1-9ad7-97cf775ed705",
        "name": "La Bande des idées #6",
        "date_time": "2015-05-05T19:30:00.000Z",
        "bd_ids": [
            "aaa5174a-d012-5a86-83ff-88ee561cee78",
            "a8f38346-3d87-5afd-9d0c-423aea300f2a",
            "09bf28a9-0ce1-5a09-a99c-a21fcffed008",
            "d6cae607-a1ff-5926-a3f2-bb062c84ffb8"
        ],
        "fb_event": "https://scontent.fcdg1-1.fna.fbcdn.net/v/t1.0-9/11110292_990154227694289_4228029765977675487_n.jpg?_nc_cat=109&_nc_ht=scontent.fcdg1-1.fna&oh=49cff7095ebfe210da24d43e044cf75b&oe=5D247C54"
    },
    {
        "id": "2456ad86-5acc-5301-9bd6-90548d61b552",
        "name": "La Bande des idées #7",
        "date_time": "2015-06-02T19:30:00.000Z",
        "bd_ids": [
            "ae0bc9de-368c-501b-bad7-5bbbe89576fb",
            "20d228c3-067c-5067-90c8-cb8cc271fe6f",
            "fa873fe7-0449-5f89-8fc9-cfe1654b8041",
            "795622ed-bfb2-50c3-8569-fb6f10d3cddd"
        ],
        "fb_event": "https://scontent.fcdg1-1.fna.fbcdn.net/v/t1.0-9/11351345_1006130122763366_7087995029299373561_n.jpg?_nc_cat=108&_nc_ht=scontent.fcdg1-1.fna&oh=98ce37ea32d0cdbbaae6edf9b8232d3b&oe=5D233300"
    },
    {
        "id": "b9550565-c4f9-51fc-b8e1-1259a3c5cc82",
        "name": "La Bande des idées #8",
        "date_time": "2015-07-07T19:30:00.000Z",
        "bd_ids": [
            "e49de7c1-067d-5937-b900-075d3a2f7799",
            "cef800c9-32c9-52ab-bf7c-f734ba6c65db",
            "7b7682a7-12fd-5c89-81c1-ce4b2ec3cedd",
            "485c9772-b7f3-5b59-99a0-5bc51d90677a"
        ],
        "fb_event": "https://scontent.fcdg1-1.fna.fbcdn.net/v/t1.0-9/10985918_1027020130674365_87534998117886051_n.jpg?_nc_cat=105&_nc_ht=scontent.fcdg1-1.fna&oh=ea8e749d604e38f1e9846738e72c660c&oe=5D210011"
    },
    {
        "id": "3b113b35-2d55-51c4-a846-f640bae083f4",
        "name": "La Bande des idées #9",
        "date_time": "2015-10-05T19:30:00.000Z",
        "bd_ids": [
            "70aad9fb-30b1-5177-8126-c531467c028e",
            "f9920e4a-7ba8-5f19-8842-ceaf65dd8b9d",
            "9f0067bc-02b7-50da-a83e-61b896fc352d",
            "da2485f6-6f49-5a22-a601-34c06f8fe55f"
        ],
        "fb_event": "https://scontent.fcdg1-1.fna.fbcdn.net/v/t31.0-8/12045710_1075450439164667_5971117612948959248_o.jpg?_nc_cat=105&_nc_ht=scontent.fcdg1-1.fna&oh=2005aa0f4bd6e914288ea3cbbf06b561&oe=5D1A90BF"
    },
    {
        "id": "00e27df2-3483-5397-bfdb-e40b84d0dd1c",
        "name": "La Bande des idées #10",
        "date_time": "2015-11-02T19:30:00.000Z",
        "bd_ids": [
            "fb96800d-99ad-51c1-a1e8-f27c7d8fbb10",
            "94bd0510-12eb-51a0-a26e-0c444a702785",
            "36e7eb28-ed60-5818-bc3a-eb39ae1e3105",
            "331c85b8-47f5-56b5-bdb2-c4ad8b36a229"
        ],
        "fb_event": "https://scontent.fcdg1-1.fna.fbcdn.net/v/t1.0-9/12143197_1088158194560558_7531947012850699320_n.jpg?_nc_cat=103&_nc_ht=scontent.fcdg1-1.fna&oh=8fcf6b47f7fc43af14416790905a7ae4&oe=5D13A4C5"
    },
    {
        "id": "590aeb5c-04d1-5591-8c71-8f194fe9dd1a",
        "name": "La Bande des idées #11",
        "date_time": "2015-12-07T19:30:00.000Z",
        "bd_ids": [
            "6dcd8372-864e-593c-aa7b-d1c4421ca80a",
            "ee4b52be-c659-5eff-ae4e-44cebfeb024c",
            "e9a8d3e6-7671-5522-9438-1ca74a7d4a54",
            "bab472e5-dba8-56e8-94b4-eaca12df0767"
        ],
        "fb_event": "https://scontent.fcdg1-1.fna.fbcdn.net/v/t1.0-9/12299298_1103504503025927_7896546280449256768_n.jpg?_nc_cat=106&_nc_ht=scontent.fcdg1-1.fna&oh=d0cf1655bccbc7a5ce24bb2427075636&oe=5CE1E329"
    },
    {
        "id": "fc63aa8e-600f-5543-807f-73035f19248e",
        "name": "La Bande des idées #12",
        "date_time": "2016-01-04T19:30:00.000Z",
        "bd_ids": [
            "5879ed08-b528-54fa-b889-cb9b6654c5e6",
            "c8efe667-cfa0-5265-92b3-8f32fbeb53b1",
            "0ee6ba43-46ad-5c80-8a2e-5114850d943b",
            "bfaec5be-c8a1-5bc8-a268-c883a4cd4ffe"
        ],
        "fb_event": "https://scontent.fcdg1-1.fna.fbcdn.net/v/t1.0-9/12366279_1115525188490525_3444939567555188617_n.jpg?_nc_cat=105&_nc_ht=scontent.fcdg1-1.fna&oh=eed31df2dc72374d64e21c71c9d94404&oe=5CE15C43"
    },
    {
        "id": "577662aa-e0e0-5fc7-9538-eea8c644fac8",
        "name": "La Bande des idées #13",
        "date_time": "2016-02-01T19:30:00.000Z",
        "bd_ids": [
            "5cad8b88-954e-5800-bf00-9a0844b4317d",
            "a1271973-c370-5a5f-a7d4-8feb30577f49",
            "169ce90d-4993-5277-b4b4-898b948ae30b",
            "c11af8d5-9a5d-5d5d-8a37-806ab326e55e"
        ],
        "fb_event": "https://scontent.fcdg1-1.fna.fbcdn.net/v/t1.0-9/12552899_1136429603066750_5278756872253066615_n.jpg?_nc_cat=108&_nc_ht=scontent.fcdg1-1.fna&oh=87aede4a8f4785bbe0c060b70ada5e39&oe=5D190012"
    },
    {
        "id": "9892d986-cf7a-5e39-8f31-7e0e110e3565",
        "name": "La Bande des idées #14",
        "date_time": "2016-03-07T19:30:00.000Z",
        "bd_ids": [
            "112b74f7-40f7-535a-aab9-b13d3c94c4d2",
            "acef282e-003f-5e71-a1db-09b55471da17",
            "429db244-0244-5954-aed2-67933069011e",
            "a287fabc-b371-534f-b5ae-bce6b907b35f"
        ],
        "fb_event": "https://scontent.fcdg1-1.fna.fbcdn.net/v/t1.0-9/12670605_1147488151960895_4559904947676418394_n.jpg?_nc_cat=106&_nc_ht=scontent.fcdg1-1.fna&oh=b0bbf60421aba76321873b82c2394a07&oe=5D1FC826"
    },
    {
        "id": "634fc1df-6058-5247-a08c-fad69ce34c2e",
        "name": "La Bande des idées #15",
        "date_time": "2016-04-04T19:30:00.000Z",
        "bd_ids": [
            "ea17e67e-3aed-5734-bee3-23d291cb2e65",
            "5c6c2ec3-ceeb-5561-af33-6dc9d7f3f5c4",
            "1fe8553a-dc4f-557c-b0c8-ed285d25d513",
            "d7db5c18-6776-5197-b68c-f61569bd178a"
        ],
        "fb_event": "https://scontent.fcdg1-1.fna.fbcdn.net/v/t1.0-9/12376363_1180131635363213_4825001361981708091_n.jpg?_nc_cat=111&_nc_ht=scontent.fcdg1-1.fna&oh=e3961e663509c86cc1a543edcaf18a58&oe=5D2174C7"
    },
    {
        "id": "77c01a2a-d1e6-590e-b030-9b97131b7e52",
        "name": "La Bande des idées #16",
        "date_time": "2016-05-02T19:30:00.000Z",
        "bd_ids": [
            "8cf6bed4-1fb3-55c1-a44b-1d26a4467c32",
            "f2860692-948f-5d47-b998-60f799a21268",
            "69f9074f-83c0-57ba-977b-1125d2fbae16",
            "e71a06a2-fc10-56f0-b0a6-f5b1ec6ce8d4"
        ],
        "fb_event": "https://scontent.fcdg1-1.fna.fbcdn.net/v/t1.0-9/11140352_1199781990064844_3792389615048652994_n.jpg?_nc_cat=101&_nc_ht=scontent.fcdg1-1.fna&oh=2b5ac277c88d4bf7ddea7177c940df5d&oe=5D23FD22"
    },
    {
        "id": "b0b01187-3e41-530a-b69d-1b778156244a",
        "name": "La Bande des idées #17",
        "date_time": "2016-05-30T19:30:00.000Z",
        "bd_ids": [
            "3bb145fc-9ba1-546b-84c5-b9bd43d58ef3",
            "80fb2922-29f9-5231-ba34-224676df214b",
            "31218cb7-1c1c-5c1e-ba45-3383eb2db2a4",
            "d6777df6-7ff7-5d60-883a-8b4a3ea24742"
        ],
        "fb_event": "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/13177596_1211136378929405_1892386029205842518_n.jpg?_nc_cat=111&_nc_ht=scontent-cdt1-1.xx&oh=5a9a5d2b3599ffd40817ef828cf4a1a8&oe=5D0C02F6"
    },
    {
        "id": "ebcd603e-64b3-5e3d-bb18-e26dcae09acf",
        "name": "La Bande des idées #18",
        "date_time": "2016-06-27T19:30:00.000Z",
        "bd_ids": [
            "0f4c7769-b9a0-5d86-90c2-0dab9cdecac5",
            "50457d0a-d275-54ae-a701-73038d4557e5",
            "ff97eec9-4561-5965-b9fd-31a81ed88ca1",
            "f6807abd-c884-551c-ad68-32d7182e64bc"
        ],
        "fb_event": "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/13407301_1238484292861280_6451655614105249900_n.jpg?_nc_cat=108&_nc_ht=scontent-cdt1-1.xx&oh=df4846c734f72e874d04eaffc4768d04&oe=5D20A24E"
    },
    {
        "id": "acaef519-c1b3-5690-84b1-d8fb25759813",
        "name": "La Bande des idées #19",
        "date_time": "2016-10-03T19:30:00.000Z",
        "bd_ids": [
            "13cec0e3-d7e3-54da-be39-8ea04750452b",
            "4855cab9-a793-5a3b-b9ed-a1ae11a4cb96",
            "b84e2de9-9773-5fb3-b098-95600aabefb4",
            "6abe3396-863c-534c-ab1f-f19543d6c60d"
        ],
        "fb_event": "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/14445970_1315239218519120_3949106291008340937_n.jpg?_nc_cat=104&_nc_ht=scontent-cdt1-1.xx&oh=ddb2df967a65262bfa152111e5ffb94f&oe=5D122887"
    },
    {
        "id": "81b7b345-17ae-599b-8c17-b38aafc42040",
        "name": "La Bande des idées #20",
        "date_time": "2016-11-07T19:30:00.000Z",
        "bd_ids": [
            "72f2081f-6273-5dc2-8c7b-28dc3370c098",
            "2e080007-73f3-551b-9c26-e8e9ebec19d2",
            "b5c177d6-e429-538f-84b3-6f857b20a7a4",
            "9491f949-140c-5092-9add-d05dc3983fe1"
        ],
        "fb_event": "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/14656390_1348809808495394_2113809148631383691_n.jpg?_nc_cat=101&_nc_ht=scontent-cdt1-1.xx&oh=b0f5c231715e9622620d5a087deeb3c4&oe=5D1E3BF4"
    },
    {
        "id": "eb52c998-b16a-55d6-a25e-fc780089bc5b",
        "name": "La Bande des idées #21",
        "date_time": "2016-12-05T19:30:00.000Z",
        "bd_ids": [
            "bde8dc28-1f8e-58e9-8de4-8efd46178c54",
            "9ac45906-4b6a-5ca4-805b-f64aec4b90bc",
            "c4a296ae-92a4-59dc-9301-4a603a7cffd0",
            "562e5012-19b0-5794-aa0e-4636a143312f"
        ],
        "fb_event": "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/15317992_1378414108868297_8537428629914642930_n.jpg?_nc_cat=101&_nc_ht=scontent-cdt1-1.xx&oh=4f2577a1db897ce8f2cc0303d196a81f&oe=5D0D270F"
    },
    {
        "id": "d7bb79a6-c63f-532e-9f9a-c52593db9321",
        "name": "La Bande des idées #22",
        "date_time": "2017-01-09T19:30:00.000Z",
        "bd_ids": [
            "163d1778-437a-5b0b-a41c-477e1740f9d6",
            "3ffeb194-5cc8-5d05-ade9-964f5999aa79",
            "3dc033eb-0039-59b2-a5c3-2dd8754bcfcc",
            "0d8ca287-8e3d-55a9-9f4f-bbe8a1a62c40"
        ],
        "fb_event": "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/15871469_1424933184216389_7395848885661616025_n.jpg?_nc_cat=105&_nc_ht=scontent-cdt1-1.xx&oh=d8e710850d8dcac116318c43d7b702dd&oe=5D0CEDB8"
    },
    {
        "id": "7e9194c4-701f-58d0-801d-6b0a204ec1d4",
        "name": "La Bande des idées #23",
        "date_time": "2017-02-06T19:30:00.000Z",
        "bd_ids": [
            "5a7dd53b-1495-5663-bea2-733fedd1d228",
            "4335f95a-162b-55fd-bc33-9ae6270eaa96",
            "92d4a711-7df9-52a6-aef4-35cf71bbc16a",
            "09bd361d-294b-548e-81d2-a24ce73e755a"
        ],
        "fb_event": "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/16174676_1446297115413329_25349491156172291_n.jpg?_nc_cat=110&_nc_ht=scontent-cdt1-1.xx&oh=ba287790c316e3b7b3a70e3f2a8a0926&oe=5CDB318B"
    },
    {
        "id": "a25ef389-a3d0-5e2e-a153-2e280ed21d81",
        "name": "La Bande des idées #24",
        "date_time": "2017-03-06T19:30:00.000Z",
        "bd_ids": [
            "1d56642e-0dc1-5f4a-aae2-0fa94df543fd",
            "7c7c3feb-134e-5fcd-8be5-c580ee005cb1",
            "d6aa2f0e-42e0-5e88-9aca-0f988aaf0156",
            "8a70367d-933d-5179-ad05-41d287a8027e"
        ],
        "fb_event": "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/17021581_1477042082338832_3691963312336295706_n.jpg?_nc_cat=101&_nc_ht=scontent-cdt1-1.xx&oh=33fdbd4d536bb781b9a327d4d23129fd&oe=5CDF58FD"
    },
    {
        "id": "a162a1f8-1fec-55a0-838d-7c9173f88142",
        "name": "La Bande des idées #25",
        "date_time": "2017-04-23T19:30:00.000Z",
        "bd_ids": [
            "264198c3-9db1-53e1-9cf2-57062511f327",
            "fb7e1f82-d227-5650-85b7-c44a4f634109",
            "9915da9c-e3bf-579d-9399-0cca6f6854ed",
            "871a5231-dd60-5c65-9b18-723b1565ffa1"
        ],
        "fb_event": "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/18010067_1534433169933056_8998104558482823340_n.png?_nc_cat=103&_nc_ht=scontent-cdt1-1.xx&oh=3735eced4a065370c325fdc250192ac2&oe=5D222119"
    },
    {
        "id": "4773d958-16dc-5d09-ac56-048ca6df63b8",
        "name": "La Bande des idées #26",
        "date_time": "2017-05-20T19:30:00.000Z",
        "bd_ids": [
            "975d271b-e1e0-54f8-9273-2debfe877e0f",
            "49643a22-7c3c-590e-909d-2b458a3c9812",
            "5a8ed5c1-88a2-5654-88d7-c1d974ade6b3",
            "1446edf4-27ba-5484-9124-b0655c28fa02"
        ],
        "fb_event": "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/18581711_1575887865787586_1170839975577071079_n.jpg?_nc_cat=102&_nc_ht=scontent-cdt1-1.xx&oh=ac2e3d6a9270ef980f606b5828258a91&oe=5CDAEDE3"
    },
    {
        "id": "41d4751a-0f18-5d59-86d2-8e48b38d35fb",
        "name": "La Bande des idées #27",
        "date_time": "2017-07-03T19:30:00.000Z",
        "bd_ids": [
            "5864aefd-c512-5acd-bfd4-654a9577e01f",
            "2ad5e35b-e8b1-57e4-b566-1e1eb9fdb2aa",
            "a3a08375-70c5-5185-aa11-1970757201c6",
            "506574d1-5d79-5ea8-a30b-2de7549df7f9"
        ],
        "fb_event": "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/37524150_2047152531994448_2390556574792810496_n.jpg?_nc_cat=110&_nc_ht=scontent-cdt1-1.xx&oh=637b59310d095b7388aadaf5c4010b0b&oe=5D0F2BF5"
    },
    {
        "id": "962b55da-7635-5b79-975c-44b8cd63497b",
        "name": "La Bande des idées #28",
        "date_time": "2017-10-02T19:30:00.000Z",
        "bd_ids": [
            "ff441b8a-e7d8-56d6-889a-43edd430e38d",
            "77b2a2e9-cb9b-5999-9b0a-81ffd06b392c",
            "83e86609-2b52-52ab-b6f2-454f3f4f1588",
            "87fa356f-0b28-50f7-ad0f-7608ec05705e"
        ],
        "fb_event": "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/22046588_1707879375921767_1666208443553365186_n.jpg?_nc_cat=108&_nc_ht=scontent-cdt1-1.xx&oh=146ceeafdefcc34b497a7b6229245fc1&oe=5D1BFBB4"
    },
    {
        "id": "e53c882f-3627-5b43-b1d8-ee7469a56d93",
        "name": "La Bande des idées #29",
        "date_time": "2017-11-06T19:30:00.000Z",
        "bd_ids": [
            "a968de90-88cc-5e8a-b553-d7298afa9d74",
            "9c926764-7669-5585-8219-0f0fb31f3498",
            "920c0bc3-909f-517c-8194-eec53442da3a",
            "765d65d1-e762-5976-bda4-410a49745faf"
        ],
        "fb_event": "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/23031599_1743463929029978_3200352309829749099_n.png?_nc_cat=102&_nc_ht=scontent-cdt1-1.xx&oh=dcc0d21138f350951af49c9985e3c396&oe=5CDB925F"
    },
    {
        "id": "016d6e71-04fa-5718-bbc4-42c714e709a9",
        "name": "La Bande des idées #30",
        "date_time": "2017-12-04T19:30:00.000Z",
        "bd_ids": [
            "b7cfe93d-0614-51ed-9121-129779a36201",
            "3c1a9222-8bc6-5dc9-9f80-8d86851d8aec",
            "18b43f2b-e8c9-553e-92e1-c13027830753",
            "42bcdd54-8a27-5fbc-b679-565b1ae82f57"
        ],
        "fb_event": "https://scontent-cdt1-1.xx.fbcdn.net/v/l/t1.0-9/23755668_1767369796639391_1277478686325266492_n.jpg?_nc_cat=100&_nc_ht=scontent-cdt1-1.xx&oh=d24a0a9fba0afa43ea3fde5e8e31eb64&oe=5D103A7E"
    },
    {
        "id": "99984239-be4b-5527-ac6f-2efffaa923c7",
        "name": "La Bande des idées #31",
        "date_time": "2018-01-08T19:30:00.000Z",
        "bd_ids": [
            "0ef59048-c3fb-5ea8-b650-75dafe1998cf",
            "2e7c3a72-b7fc-5260-a119-e8a94af085e5",
            "06ce7cf3-e238-5bb4-80c8-2000e8c536c7",
            "37e7a325-c27f-5f10-a2d6-21765d017dd8"
        ],
        "fb_event": "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/26168857_1810957948947242_2756578082164197469_n.jpg?_nc_cat=102&_nc_ht=scontent-cdt1-1.xx&oh=209178d9bf3619558a680e48bf576525&oe=5D0DB4D1"
    },
    {
        "id": "6726e0d7-3eb4-5b42-b5e8-d3bd3088b319",
        "name": "La Bande des idées #32",
        "date_time": "2018-02-05T19:30:00.000Z",
        "bd_ids": [
            "4bc94c79-035d-558e-85ae-c08e1baee587",
            "b8354485-7ce8-5d1c-a71b-bca27475f6c7",
            "5be2ee50-4405-56c2-b59f-fbdc8438e45e",
            "68213172-a9fb-5a77-9b90-2668f465ed84"
        ],
        "fb_event": "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/27067504_1841112142598489_7184528437488560486_n.jpg?_nc_cat=108&_nc_ht=scontent-cdt1-1.xx&oh=ff206716f00ef4ce4919a58ce1f06bc0&oe=5D260DF2"
    },
    {
        "id": "10c922a7-8e8b-50ca-ae70-0e9dad0db06b",
        "name": "La Bande des idées #33",
        "date_time": "2018-04-08T19:30:00.000Z",
        "bd_ids": [
            "d7561c34-87ed-5351-9dcd-cabcdda88eb9",
            "ef41686b-1031-581f-a454-351eef12c49b",
            "9b7133ae-5594-5171-a72d-28be9d48ac38"
        ],
        "fb_event": "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/29573175_1909178212458548_6510851018372175617_n.jpg?_nc_cat=102&_nc_ht=scontent-cdt1-1.xx&oh=9fea07126eba712a6071ab80b0da0b26&oe=5D0FF1B1"
    },
    {
        "id": "41d6ae0e-8b21-541d-a141-e8cc0134bbab",
        "name": "La Bande des idées #35",
        "date_time": "2018-05-14T19:30:00.000Z",
        "bd_ids": [
            "a2edcba9-4069-57fa-860a-9b0f656b7911",
            "2ab19c62-8468-5b16-99a6-f5b97153b993",
            "e0f10239-868a-5cde-b6dd-9c94fed8d7b5",
            "4752dff7-0fcb-5360-a636-374577c0b313"
        ],
        "fb_event": "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/31945380_1947020325341003_8619787290471825408_n.jpg?_nc_cat=103&_nc_ht=scontent-cdt1-1.xx&oh=c6f78b3917a6dbe2c7bbf840a08b3291&oe=5D1CB347"
    },
    {
        "id": "2fc305c6-f0c7-5462-9a45-89241614c418",
        "name": "La Bande des idées #36",
        "date_time": "2018-06-04T19:30:00.000Z",
        "bd_ids": [
            "0e432312-5b7e-50f8-afba-7869c1256706",
            "8f885326-1105-5c04-9cb9-1df0a0d79080",
            "3d3f33fa-274c-5750-bbe8-b8a37f599031",
            "967b3863-f429-58b5-804c-12a7b22632fd"
        ],
        "fb_event": "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/33765875_1968566439853058_6763955458291007488_n.jpg?_nc_cat=110&_nc_ht=scontent-cdt1-1.xx&oh=f324ce96fc252504653a7e91e01b5416&oe=5D1BF9A6"
    },
    {
        "id": "07171107-88be-5a83-be43-0205a9c53237",
        "name": "La Bande des idées #37",
        "date_time": "2018-09-03T19:30:00.000Z",
        "bd_ids": [
            "3d1c60ea-55ba-5ab4-a4fb-8b946c6b1c19",
            "7cb93591-7dde-59e6-9afd-dc565a390435",
            "d0acc909-4425-5267-a65a-41d9ca5be16b",
            "c5f4a66e-a9f9-530f-8694-d73e0c2f8e4c"
        ],
        "fb_event": "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/40054328_2110024205707280_5284287186995249152_n.jpg?_nc_cat=106&_nc_ht=scontent-cdt1-1.xx&oh=d835e0a4f5ae72f3625a9632b6f28ffc&oe=5CE1A0FC"
    },
    {
        "id": "437bf521-fecc-5100-9170-e59fe3b5a117",
        "name": "La Bande des idées #38",
        "date_time": "2018-10-01T19:30:00.000Z",
        "bd_ids": [
            "395b6a6b-7acb-5a84-8ddf-e855409977b8",
            "0fe6b6ee-7baa-56dc-ab21-40f63a87421b",
            "27aa754b-ec29-5d31-aac3-143f9055fdb5",
            "21bdadd2-bb70-57c4-9fac-bb1eef30acc0"
        ],
        "fb_event": "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/42607884_2150476651662035_5013794029343604736_n.jpg?_nc_cat=110&_nc_ht=scontent-cdt1-1.xx&oh=93564aeb260afe78d0e73f61770e62f6&oe=5D2378B2"
    },
    {
        "id": "19afc03b-0b2f-5102-946c-c27a7158332e",
        "name": "La Bande des idées #39",
        "date_time": "2018-11-05T19:30:00.000Z",
        "bd_ids": [
            "a487bacd-3e60-5db3-9c0f-e8167d21ca9d",
            "7a876a7a-5b64-5cde-9870-ecb1aa6d034c",
            "6a5e1b8a-0898-5cbd-b53c-ffcb5fb7bb59",
            "8347cdbe-e853-583d-a6f8-3288b8bb55a5"
        ],
        "fb_event": "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/44245490_2179972502045783_4181771306905108480_n.jpg?_nc_cat=107&_nc_ht=scontent-cdt1-1.xx&oh=2c6394761f1a6c1081c8700b6dee5c5f&oe=5D28EB26"
    },
    {
        "id": "75bd8d09-d669-50a0-a00c-48987b2b9472",
        "name": "La Bande des idées #40",
        "date_time": "2018-12-03T19:30:00.000Z",
        "bd_ids": [
            "c77e8572-a4d7-5a3e-b772-31dd942e9d39",
            "4bb23804-0bcf-59c4-b051-ebf483efde5f",
            "7e408fbd-928f-56ab-b646-d972f5e24698",
            "21801dc4-dd74-5bc0-881d-89f0328bcfcf"
        ],
        "fb_event": "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/46494379_2228673830508983_6424827537838309376_n.jpg?_nc_cat=103&_nc_ht=scontent-cdt1-1.xx&oh=9c9f9dea8af43fa38d8db1298c47de0a&oe=5D1EDA91"
    },
    {
        "id": "61341a8b-4c8c-56b4-856b-8ddfa3fd4ba2",
        "name": "La Bande des idées #41",
        "date_time": "2018-01-07T19:30:00.000Z",
        "bd_ids": [
            "b4e6e54b-c87a-5158-b824-bba62706d262",
            "344c953c-2f98-510e-9642-b193cc079eeb",
            "b543747f-1269-5f2c-98d3-13188b27d9b0",
            "795ed7d3-240b-5db3-8a23-41fe5531f853"
        ],
        "fb_event": "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/48393030_2271348946241471_7781236312232689664_n.jpg?_nc_cat=104&_nc_ht=scontent-cdt1-1.xx&oh=18704fae68530b7984f67b6a4a044c05&oe=5D0F4B4F"
    },
    {
        "id": "ceff02b3-7019-5ae7-8968-0907eff83fdb",
        "name": "La Bande des idées #42",
        "date_time": "2018-02-04T19:30:00.000Z",
        "bd_ids": [
            "0a1fa77f-b0ff-55a3-ba65-d274ab0605d3",
            "91796292-f679-5dc3-8e16-f53e3cd37480",
            "5c0d585f-9e55-51fb-bb16-f98389cb7ce4",
            "08e65064-e95c-5215-8c3d-adb674683828"
        ],
        "fb_event": "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/50210461_2325301247512907_1931457551904276480_n.jpg?_nc_cat=101&_nc_ht=scontent-cdt1-1.xx&oh=e28ec1fc8e95d9828339de2b7c570a31&oe=5D257638"
    },
    {
        "id": "7373210e-8d7c-5ea1-a2de-8f97310f21f9",
        "name": "La Bande des idées #43",
        "date_time": "2018-03-04T19:30:00.000Z",
        "bd_ids": [
            "3d70b2d5-2977-5edc-972d-5f5e66124eef",
            "bf4fe76d-85e6-5b2b-8093-bd397f29ccc2",
            "8ac3624a-93f8-5771-975b-942423b399b5",
            "45654738-801a-54ec-a4da-363363691092"
        ],
        "fb_event": "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/53071290_2382826551760376_4380486648983453696_n.jpg?_nc_cat=111&_nc_ht=scontent-cdt1-1.xx&oh=67247ee1f3b53b3757069833001c06d5&oe=5D1CE030"
    },
    {
        "id": "e3653545-0c2a-50bd-8d14-699d252b53a9",
        "name": "La Bande des idées #44",
        "date_time": "2019-04-01T19:30:00.000Z",
        "bd_ids": [
            "6a77cc15-294a-5114-8d5f-73d5d402ab51",
            "20804294-4e09-50cd-94bd-8372e5d99a58",
            "85b4afe0-39bc-53e9-b894-84624222cc7d",
            "9a9a15ba-5c4a-5d05-9b95-0f346d811cf6"
        ],
        "fb_event": "https://www.facebook.com/events/285763049007863/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22page%22%7D]%7D"
    },
    {
        "id": "611db4de-5ee6-5c83-83c5-af36e6222068",
        "name": "La Bande des idées #45",
        "date_time": "2019-05-06T19:30:00.000Z",
        "bd_ids": [
            "a9faa5b6-9672-510a-bd92-634e3aeb2240",
            "4d775666-080c-5f46-ab43-983746584a96",
            "99f378b2-5ec4-5e8c-9e8d-eec995fc7e71",
            "6719474d-ed51-5f92-8278-3646bb92c03b"
        ],
        "fb_event": "https://www.facebook.com/events/325704408128713/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22page%22%7D]%7D"
    },
    {
        "id": "35935fa2-a008-5d4a-837d-ff51e42f0123",
        "name": "La Bande des idées #46",
        "date_time": "2019-06-03T19:30:00.000Z",
        "bd_ids": [
            "e4e1d8bd-5c94-57eb-9b76-45b0d2e3c1b7",
            "0a23fbe5-b7b7-547f-95ef-c8e4c169ba84",
            "8b193f6b-8fc9-5dd4-8f86-3dffe109ace2",
            "0eb55165-0714-592e-b967-ca0d76ba06ff"
        ],
        "fb_event": "https://www.facebook.com/events/1129332163916912/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22page%22%7D]%7D"
    },
    {
        "id": "15afad0f-6a49-5a5d-9361-e696250a3993",
        "name": "La Bande des idées #47",
        "date_time": "2019-07-01T19:30:00.000Z",
        "bd_ids": [
            "455fed83-1d56-56f4-b2e3-46efbcc1f0e1",
            "ea9613e4-c0a1-5a88-b2a4-fc986c9f2240",
            "935c5f25-3edb-5853-91ea-c0c75d211ba5",
            "99f43ae7-65c3-5f0b-bd9a-336ad6735fea"
        ],
        "fb_event": "https://www.facebook.com/events/356507151919604/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22page%22%7D]%7D"
    },
    {
        "id": "943ef86c-2f3d-5418-811c-3984ec44218e",
        "name": "La Bande des idées #48",
        "date_time": "2019-09-02T19:30:00.000Z",
        "bd_ids": [
            "3d6f3134-2abf-5826-9462-12df423eeb00",
            "90a07961-765f-588b-a9b1-147327ff19e6",
            "b6e3995c-deef-5246-a9b0-df3a38e0f7e8",
            "fa63dd8d-c49f-5a56-9f07-8f6fbbb45dbc"
        ],
        "fb_event": "https://www.facebook.com/events/665582067287940/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22page%22%7D]%7D"
    },
    {
        "id": "d7b3cb60-82d7-5ed6-9e24-5df38660b7e2",
        "name": "La Bande des idées #49",
        "date_time": "2019-10-07T19:30:00.000Z",
        "bd_ids": [
            "91f06cb8-a704-5705-b48a-2015fa0dd6b8",
            "9c1164e3-301e-5075-af2f-013c819bb56a",
            "da0ebc32-b9ab-5dbd-a2ef-1ef33fd0c3ea",
            "809c07eb-4cdb-564d-801f-810e13afae93"
        ],
        "fb_event": "https://www.facebook.com/events/2474036006005538/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22page%22%7D]%7D"
    },
    {
        "id": "123794f1-5856-5238-9fb5-380ed5d2e2f0",
        "name": "La Bande des idées #50",
        "date_time": "2019-11-04T19:30:00.000Z",
        "bd_ids": [
            "04614ebb-df6b-5425-9f49-a953190b114f",
            "fff5e173-faf5-5091-b143-91036a35047d",
            "88083fb1-f033-50a2-a26a-84921246605c",
            "41a293e2-8d3d-5933-9188-f01edc26eb0c"
        ],
        "fb_event": "https://www.facebook.com/events/2533623426867287/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22page%22%7D]%7D"
    },
    {
        "id": "f900f0b1-9572-5d14-82cc-81f65d0543b6",
        "name": "La Bande des idées #51",
        "date_time": "2019-11-27T19:30:00.000Z",
        "bd_ids": [
            "d535ad5b-baf2-54af-b3d5-17d8b52332ff",
            "dcc25ccb-bc58-5f18-9a49-a54fc52fdcf3",
            "4e54d086-2092-5623-81ce-cdb52ee354a3",
            "33368bc9-256a-520a-88cc-b78bd19c6dce"
        ],
        "fb_event": "https://www.facebook.com/events/509526156269235/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22page%22%7D]%7D"
    },
    {
        "id": "282002d3-3314-58cb-a08c-56d1b660f8ed",
        "name": "La Bande des idées #52",
        "date_time": "2019-12-02T19:30:00.000Z",
        "bd_ids": [
            "1346fd40-465d-50a8-9dbf-1b3db2f2f962",
            "9ea2ba3b-2b4e-5225-9479-85a8b1c8761a",
            "5664c22b-88d2-5a47-bf61-fb3e4f657a0b",
            "56fc148f-32d4-5cb2-a0e4-8eee0f478cfb"
        ],
        "fb_event": "https://www.facebook.com/events/1143293975868038/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22page%22%7D]%7D"
    },
    {
        "id": "1b7d31e9-f721-586b-a7b0-535c61a4ede7",
        "name": "La Bande des idées #53",
        "date_time": "2020-01-06T19:30:00.000Z",
        "bd_ids": [
            "5cf79362-fbc8-5768-a71e-da1f3da4979b",
            "99cf5bac-a6b4-5fa0-ace7-3b6acdda880b",
            "6486c644-9f52-5b81-8121-a07c9ca820d3",
            "a07deabb-ba5c-5b23-bd86-e977a8865e6c"
        ],
        "fb_event": "https://www.facebook.com/events/778287175971506/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22page%22%7D]%7D"
    },
    {
        "id": "8fbf38d9-87d9-54df-ad0f-ce0e935813e4",
        "name": "La Bande des idées #54",
        "date_time": "2020-02-03T19:30:00.000Z",
        "bd_ids": [
            "3852be01-9880-52eb-8493-9b3a5758e58f",
            "7769da5e-26ce-5da9-bec0-7a649cbadc21",
            "e897052f-d4f2-5e42-9731-c4f7b672d891",
            "a5c2edd4-0e57-5aff-ad51-1da715ae3f5e"
        ],
        "fb_event": "https://www.facebook.com/events/1552168821619081/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22page%22%7D]%7D"
    },
    {
        "id": "cc962b47-ac4d-5add-8aeb-39e10f0374e6",
        "name": "La Bande des idées #55",
        "date_time": "2020-03-02T19:30:00.000Z",
        "bd_ids": [
            "126597e8-c9b9-59ea-bd95-81b0e7b61342",
            "f85336b5-f4df-5112-a405-cf0dbd14fd50",
            "531a885c-829a-59e3-9ce8-4af27ee228e2",
            "ef0b7e38-3627-5f6e-b460-3e92a56d3a13"
        ],
        "fb_event": "https://www.facebook.com/events/2274982579461524/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22page%22%7D]%7D"
    },
    {
        "id": "709fba55-6a76-5210-83d2-4b1f0c2dd39d",
        "name": "La Bande des idées #56",
        "date_time": "2020-09-07T19:30:00.000Z",
        "bd_ids": [
            "f82923f6-8cff-5419-927a-c3db18e9992f",
            "12865e73-340e-5385-a1c0-8dcd99f6ad82",
            "58bf1586-0770-5e05-9d5e-84b033947d1f",
            "9f71560e-9697-518d-a092-a2e73ca2c608"
        ],
        "fb_event": "https://www.facebook.com/events/337707800690646/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22page%22%7D]%7D"
    },
    {
        "id": "e0863d9e-e93d-525a-9dbb-89140edf2588",
        "name": "La Bande des idées #57",
        "date_time": "2020-09-11T19:30:00.000Z",
        "bd_ids": [
            "e36d75cf-f479-5e9b-b009-eecbf2f6e86d",
            "d0b3e70f-1430-5736-8b87-84b725afaebe",
            "e2e2f078-9136-5fed-a6e2-ddc3cde39297",
            "16564728-90ed-5edc-8eae-08a5f7785cff"
        ],
        "fb_event": "https://www.facebook.com/events/1500880476772063/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22page%22%7D]%7D"
    },
    {
        "id": "f4307f94-c546-5685-b0d8-adc74d04b6cc",
        "name": "La Bande des idées #58",
        "date_time": "2021-07-05T19:30:00.000Z",
        "bd_ids": [
            "7655deef-be68-561d-a942-3a401c24343e",
            "2a776a76-0486-5fa8-a693-0507a23edda8",
            "e0079da4-868b-589a-8dc6-7c04973b026b",
            "2a5e1c5f-476c-5d4e-81f3-2b78cb856e41"
        ],
        "fb_event": "https://www.facebook.com/events/234358424838579/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22page%22%7D]%7D"
    },
    {
        "id": "5d4270fe-0c68-5bf2-92e5-75ad356de8a4",
        "name": "La Bande des idées #59",
        "date_time": "2021-09-06T19:30:00.000Z",
        "bd_ids": [
            "473edb56-8483-5f87-ae9a-226e5639da7c",
            "d8f9a56b-3061-5c16-9cce-1d231de67319",
            "cd0cdc46-bfd4-5850-beaf-3019f10e3e7b",
            "1a3f1d17-bebd-5ddb-abe3-9533675f24a8"
        ],
        "fb_event": "https://www.facebook.com/events/277491040426073/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22page%22%7D]%7D"
    },
    {
        "id": "090131b6-3b33-5b91-ac22-f73f60f5d347",
        "name": "La Bande des idées #60",
        "date_time": "2021-10-04T19:30:00.000Z",
        "bd_ids": [
            "609fe001-1408-54fc-8686-1a7094aaa0da",
            "493aa385-71e1-5b94-937d-fc270fd2d7bc",
            "209120cd-8ef2-5051-9030-5750844215c5",
            "00b764c7-9e57-5a44-8922-76ffc6c0c006"
        ],
        "fb_event": "facebook.com/events/831818477405291/"
    },
    {
        "id": "b2b823be-b192-5bd5-9047-db6dac16cd7a",
        "name": "La Bande des idées #61",
        "date_time": "2021-11-08T19:30:00.000Z",
        "bd_ids": [
            "385f1264-4b26-5572-b2a8-10343d26cc7c",
            "2f0d945f-bd63-5967-9a57-844e20b11675",
            "045e3ca9-5744-52bb-ba4c-d69f08e9c343",
            "98a1d8c6-853d-5970-b117-ace76d927b91"
        ],
        "fb_event": "https://www.facebook.com/events/565369727882126"
    },
    {
        "id": "e17498f8-e03e-5e24-8a88-9c976c869054",
        "name": "La Bande des idées #62",
        "date_time": "2021-12-06T19:30:00.000Z",
        "bd_ids": [
            "0527534f-2c66-5d92-94d5-e579f45fd919",
            "5bebe1b3-ed45-5b99-bc12-026abccc686e",
            "45a36e4f-7780-53c1-b774-353b3aa6e85e",
            "be84548c-9e26-56ea-a97d-bdf4b9653250"
        ],
        "fb_event": "https://www.facebook.com/events/288789526481300/"
    },
    {
        "id": "aabf7c0f-3e3c-53d0-8439-2987209842ce",
        "name": "La Bande des idées #63",
        "date_time": "2022-03-07T19:30:00.000Z",
        "bd_ids": [
            "04c7c967-43b9-5255-a016-a6a6713ccaf0",
            "808def66-0261-5fb0-adf1-2e8c3f8761d8",
            "6cbc856d-bbf3-517d-8096-69dcf2e9b270",
            "122a0172-06d1-548d-a796-547d56b7fa4c"
        ],
        "fb_event": "https://www.facebook.com/events/3198494570473230/"
    },
    {
        "id": "8a669087-f5d9-5ad7-8e68-ebb6a641bcc1",
        "name": "La Bande des idées #64",
        "date_time": "2022-04-04T19:30:00.000Z",
        "bd_ids": [
            "e37157f2-efbb-508a-bc47-17a90bc02c84",
            "ad666457-dc66-5f79-a8e2-24d71257ce29",
            "deb20c8e-015a-5c9c-9686-1111263e8a0a",
            "95b4b543-ca5b-5c52-a9a8-ee27b4ebe32b"
        ],
        "fb_event": "https://www.facebook.com/events/515214300290482/"
    },
    {
        "id": "c6c3bfe8-27bb-5f87-8f63-9c307b2adb36",
        "name": "La Bande des idées #65",
        "date_time": "2022-05-02T19:30:00.000Z",
        "bd_ids": [
            "2d214a1a-d718-56ca-b4b1-daecd27fbc70",
            "553ba159-d15e-5f69-a159-fc28c71edeca",
            "0e8111d0-2e90-54c7-88b1-43b0e0881cc9",
            "ed1239f8-6705-59cc-89fa-0f58a386644e"
        ],
        "fb_event": "https://www.facebook.com/events/326501759551822/"
    },
    {
        "id": "c1b58e60-3d64-5fd5-aa5d-83a476a8bab1",
        "name": "La Bande des idées #66",
        "date_time": "2022-06-13T19:30:00.000Z",
        "bd_ids": [
            "259a0454-9500-5b1b-be3c-1039abe5838a",
            "5b09fc60-7852-5dd7-85fd-47d06d44ac08",
            "5792de8a-229c-5f32-9cd0-3d9421f85b62",
            "d77af3ef-1018-580f-8b4b-bdac6993c4b9"
        ],
        "fb_event": "https://www.facebook.com/events/561044688714389/"
    },
    {
        "id": "208965ad-c1ba-5935-ad9c-599ec120152f",
        "name": "La Bande des idées #67",
        "date_time": "2022-07-04T19:30:00.000Z",
        "bd_ids": [
            "081abfa6-a3db-5c8b-ac64-f2ef4e0beb4d",
            "93c55d49-da91-53a8-9384-a9e74f86fe92",
            "81d0933e-90f7-5b74-b9fb-ba27cc47fa12",
            "bb95f1ee-35e4-5172-bcf9-11aa19d39885"
        ],
        "fb_event": "https://www.facebook.com/events/525967912554941/"
    },
    {
        "id": "a03c92e9-d27b-5a1a-83b5-01c0a6448113",
        "name": "La Bande des idées #68",
        "date_time": "2022-09-05T19:30:00.000Z",
        "bd_ids": [
            "219fdb59-446f-5ec8-ada8-aa3432778341",
            "7e0fbd51-70be-5b79-b9fd-fdcbdbe6784d",
            "67a5f9be-05e5-5595-a37f-a5ab7ac9952b",
            "fbb83c90-bc31-53bb-82f1-62a4921b7b66"
        ],
        "fb_event": "https://www.facebook.com/events/446752527364617/"
    },
    {
        "id": "eeadbfa3-c51f-50a0-ab86-e2ac7810303e",
        "name": "La Bande des idées #69",
        "date_time": "2022-10-03T19:30:00.000Z",
        "bd_ids": [
            "2f23ec7b-6aa5-5cf5-b8ac-331ee184fe94",
            "90278e20-06f0-50f8-a8f0-04b97acfe3ce",
            "aa142d80-6e53-53cf-ad01-13c8af2060cf",
            "22bae3a8-139b-5a3f-932f-80fc901d43af"
        ],
        "fb_event": "https://www.facebook.com/events/616184793487017/"
    },
    {
        "id": "2c1a0bf6-fd69-5ce4-a0dc-4c49a0a5c1b4",
        "name": "La Bande des idées #70",
        "date_time": "2022-11-07T19:30:00.000Z",
        "bd_ids": [
            "621f773d-d0aa-5e22-bf81-c530967a1fbe",
            "8b049e1b-5908-5c4b-972e-d34e04c6ab0c",
            "a88d2dfe-e823-5455-b5a7-a9eea7604db2",
            "20219cc1-6639-5762-9325-1f565d5143ce"
        ],
        "fb_event": "https://www.facebook.com/events/793465931802389/"
    },
    {
        "id": "8057115a-7249-5288-a959-7f770b0707da",
        "name": "La Bande des idées #71",
        "date_time": "2022-12-05T19:30:00.000Z",
        "bd_ids": [
            "7c33cd89-18a5-55ee-a927-d33a3b91a4d4",
            "8e76ff82-caba-5256-b56f-36fdcc09b8cc",
            "6f40ce09-c1fc-56c3-b191-aaef5f620982",
            "6285af41-5732-5e84-907f-7c1c6393c5e5"
        ],
        "fb_event": "https://www.facebook.com/events/1126501241325870/"
    },
    {
        "id": "1320b429-70e2-593e-976d-0cc9646e88c8",
        "name": "La Bande des idées #72",
        "date_time": "2023-01-09T19:30:00.000Z",
        "bd_ids": [
            "e316844c-27bd-5037-a0f8-1327a62e748f",
            "92d5d028-df2f-5e50-b4b7-9887ae2f807b",
            "80e320c2-11e7-595b-89ba-24b81ea6d621",
            "8faa03ae-f8f4-5b68-9059-c0c628f85707"
        ],
        "fb_event": "https://www.facebook.com/events/434532382115033/"
    },
    {
        "id": "814b8d2c-b7ac-5509-9440-0e6532e9847a",
        "name": "La Bande des idées #73",
        "date_time": "2023-02-06T19:30:00.000Z",
        "bd_ids": [
            "af8eb788-7a27-5205-84b1-ae1298595b7d",
            "f6c7005e-7b64-5eef-844a-2ac4acdc1b07",
            "406eb059-e7e8-54f1-8f89-cddea6c629e0",
            "f865a993-10dd-5daf-9303-db5328540034"
        ],
        "fb_event": "https://www.facebook.com/events/898411191495073/"
    },
    {
        "id": "ec126adf-2c87-51c4-b109-22b7689339ad",
        "name": "La Bande des idées #74",
        "date_time": "2023-03-13T19:30:00.000Z",
        "bd_ids": [
            "ec050548-66da-5642-af27-79ee4e0f5571",
            "a363d9bd-8981-5155-9eb6-c9cef10c231a",
            "01c74bc6-960a-58b3-9069-ca12ec2fb9b4",
            "e00d76ed-0c5c-5fcb-b972-355c57612e91"
        ],
        "fb_event": "https://www.facebook.com/events/1359635898192804/"
    },
    {
        "id": "eede8ed7-1012-5831-95cb-b0d7c540f82c",
        "name": "La Bande des idées #75",
        "date_time": "2023-04-03T19:30:00.000Z",
        "bd_ids": [
            "b86b53b5-7121-5fae-8ed9-50fc48076812",
            "4926fa87-8fac-59ea-b462-beaa8865b399",
            "b2b56cf4-189b-5c0f-b0a9-b3f4944df2f8",
            "904c9d20-f81a-591d-b110-2e457f6d8f60"
        ],
        "fb_event": "https://www.facebook.com/events/213242371310791/"
    },
    {
        "id": "2412bc73-7636-5bb4-84b3-059088f2b82f",
        "name": "La Bande des idées #76",
        "date_time": "2023-05-15T19:30:00.000Z",
        "bd_ids": [
            "24c15eca-cdd6-52e2-ae02-ca99c6a37884",
            "e2d4bc7b-ec4b-5fb3-880e-e94f5c8c0eaa",
            "df990528-33c4-5c15-87e0-ad4119be24f3",
            "47a951d2-d847-566a-9180-6dad63037708"
        ],
        "fb_event": "https://www.facebook.com/events/942395466984150/"
    },
    {
        "id": "f229dbf3-e754-590d-a0b4-23b74e28cc7a",
        "name": "La Bande des idées #77",
        "date_time": "2023-06-05T19:30:00.000Z",
        "bd_ids": [],
        "fb_event": "https://www.facebook.com/events/622624873248708"
    },
    {
        "id": "7cfd32e5-2609-59f6-8a7c-b9a75bd93ddc",
        "name": "La Bande des idées #78",
        "date_time": "2023-07-03T19:30:00.000Z",
        "bd_ids": [
            "f2ece642-d63f-5322-8208-0d755268b0a7",
            "b94bc845-eb86-5631-9fb8-fcaf3f1b0ed5",
            "233df3dc-5aec-5505-b208-b7dad00c99b1",
            "903acafa-4e30-5dcb-85ec-e2d1ce52d741"
        ],
        "fb_event": null
    },
    {
        "id": "90f854a6-e76e-5e9b-8868-3e30eaf40e0d",
        "name": "La Bande des idées #79",
        "date_time": "2023-09-04T19:30:00.000Z",
        "bd_ids": [
            "d7d58ce0-3034-5dc1-ad26-f2ba302c0559",
            "73418c95-df6c-50b9-8713-0cd6437ca1e8",
            "32c39747-541d-55b3-b217-835c9e26ffdb",
            "12d42d70-3a3c-5d61-bf59-ac8cc63ba0a5"
        ],
        "fb_event": "https://www.facebook.com/events/2394873167358468"
    },
    {
        "id": "63b8a88a-a47e-5b0d-a5b7-0f857ab8e48e",
        "name": "La Bande des idées #80",
        "date_time": "2023-10-02T19:30:00.000Z",
        "bd_ids": [
            "0600c708-f469-5a62-87d6-0081966be2b0",
            "28c74fd2-511a-5728-a28e-8876fa62ece8",
            "c7de24d2-2e14-55d4-9ba8-d7999551971b",
            "5ce81c2c-23ca-5bfe-899a-011a2c38e9e0"
        ],
        "fb_event": "https://www.facebook.com/events/1019108149125333"
    },
    {
        "id": "8b17df4f-c7a6-568b-bba7-e9f0474230ac",
        "name": "La Bande des idées #81",
        "date_time": "2023-11-06T19:30:00.000Z",
        "bd_ids": [
            "46840f52-8e72-51fa-8308-bfe9e584b7c8",
            "66419695-ae35-53a0-b7db-55e99b5d6b02",
            "970a07a3-e2a0-5c36-bf0f-9a6f4ea83dad",
            "945ced24-f871-580c-a2cd-e55da6520b39"
        ],
        "fb_event": "https://www.facebook.com/events/1715263022310108"
    },
    {
        "id": "bf7694bb-b7a0-5258-9679-5e32f0e0399f",
        "name": "La Bande des idées #82",
        "date_time": "2023-12-04T19:30:00.000Z",
        "bd_ids": [
            "f276e705-9146-5580-823a-15d8c2591660",
            "714b0f37-f73f-5508-825c-281074c8aebe",
            "c63fb7f3-28e9-51b0-a879-a22cae604ae9",
            "76da166c-6887-58fe-839c-5ceb1d79b8ee"
        ],
        "fb_event": "https://www.facebook.com/events/1563147154518585"
    },
    {
        "id": "1871fd36-4f87-59f2-9dfb-a14b9259289e",
        "name": "La Bande des idées #83",
        "date_time": "2024-01-08T19:30:00.000Z",
        "bd_ids": [
            "4fe38dd6-5f77-5f47-8a7d-4a869f44334a",
            "ca07d9e7-2615-5857-8ff2-c8a481345db9",
            "f9700842-783a-547b-b038-f388c81263c4",
            "e7880ee2-b182-5a13-8a84-f3877bd0a932"
        ],
        "fb_event": "https://www.facebook.com/events/871004508030312/"
    },
    {
        "id": "9d44e8ca-98e0-57f9-97c8-957ce1fe0405",
        "name": "La Bande des idées #84",
        "date_time": "2024-02-05T19:30:00.000Z",
        "bd_ids": [
            "c36e3da5-0be8-5732-a555-fb7a2b9adc95",
            "a0258b1a-9505-561d-a6a8-ca69479420d8",
            "677a0a0d-9f0e-5524-892e-5feeda95fa37",
            "5ee6ce29-7b61-53b4-8994-a0a2e783cf92"
        ],
        "fb_event": "https://www.facebook.com/events/394766139896709/"
    },
    {
        "id": "09591678-ae62-5c46-99bc-8a8b4eaa0ffa",
        "name": "La Bande des idées #85",
        "date_time": "2024-03-04T19:30:00.000Z",
        "bd_ids": [
            "af4e1bb1-ecf0-5912-8197-9d9e0b210b72",
            "fc30f32a-3e20-5385-b28a-7439ee532389",
            "aa01d166-f99b-5537-9d2f-99f433ffdc97",
            "fc62fcaa-84ef-5a91-a79d-34ee62b436ef"
        ],
        "fb_event": "https://www.facebook.com/events/309085812162790/"
    },
    {
        "id": "b6b7fc5a-d592-5d96-854f-05558c763187",
        "name": "La Bande des idées #86",
        "date_time": "2024-04-08T19:30:00.000Z",
        "bd_ids": [
            "8a50365e-9da9-59dd-bc97-969ed43c22c7",
            "515abf3f-be71-5dc5-a79a-662cd25fccf6",
            "0c7c6682-3287-56d0-a8d6-82aea0648529",
            "debf7682-e9ad-587d-a814-efdeaad2c9e7"
        ],
        "fb_event": "https://www.facebook.com/events/7457885997592030/"
    },
    {
        "id": "075999c0-bbf4-5524-9f02-8526d66cd913",
        "name": "La Bande des idées #87",
        "date_time": "2024-05-06T19:30:00.000Z",
        "bd_ids": [
            "e2102e41-2abb-59a4-b7fe-8d4ecc23e1da",
            "956b5864-d695-5e4f-b6f3-48078e019fe0",
            "ab707df2-5f9e-5bce-ba06-da7fc0e88bfd",
            "bde7b6df-1144-56af-8a15-03f3710adb93"
        ],
        "fb_event": "https://www.facebook.com/events/788288109916410/"
    },
    {
        "id": "7cb0e7e6-cbc0-59b2-a19b-dfe02cee7c85",
        "name": "La Bande des idées #88",
        "date_time": "2024-06-03T19:30:00.000Z",
        "bd_ids": [
            "52b5768f-92ea-5ea0-864c-f91c838da16c",
            "13a95766-1ae7-52fc-8158-e51115b8fa4a",
            "531a885c-829a-59e3-9ce8-4af27ee228e2",
            "39c9b8b4-fc17-5fb3-bda6-7f183cca54c7"
        ],
        "fb_event": "https://www.facebook.com/events/1440004920219390/"
    },
    {
        "id": "7a658366-6710-5724-859d-c94de9e9d9ab",
        "name": "La Bande des idées #89",
        "date_time": "2024-07-22T19:30:00.000Z",
        "bd_ids": [
            "a01a8124-f371-5a31-a90b-8bcf85d43a7c",
            "321c2793-05ba-57fa-abc0-2c59c7c6aaa3",
            "5d75aa1d-71ee-5ee7-be23-59e9d10c519a",
            "6d437cee-8870-53d7-bffa-9aba1bb92823"
        ],
        "fb_event": "https://www.facebook.com/events/1255888845377371/"
    },
    {
        "id": "3d3c0b42-70a2-5146-a04f-9b0782e75776",
        "name": "La Bande des idées #90",
        "date_time": "2024-09-02T19:30:00.000Z",
        "bd_ids": [
            "1ed863f9-5aea-574a-8e7a-8a8f061235e5",
            "48a7b58b-aa17-5b0d-98ec-fe8a997395c0",
            "b089120d-7f10-5457-96b1-b233822e6f5e",
            "330732a9-e0e1-5cf1-a00d-ecd08a2bc222"
        ],
        "fb_event": "https://www.instagram.com/p/C_AzrjcMqvb/"
    },
    {
        "id": "d22485f9-9242-5a72-bc1e-9c223c27134d",
        "name": "La Bande des idées #91",
        "date_time": "2024-10-07T19:30:00.000Z",
        "bd_ids": [
            "d0773c0e-efce-5e3f-b88c-b401e6925875",
            "4aa33079-62c2-5233-88ae-8e754c339e59",
            "1de89bb4-2d86-543c-845e-fba8f42fc847",
            "e6eb00f3-e29c-59a5-bf7e-7ca9a65fcd33"
        ],
        "fb_event": "https://www.instagram.com/p/C_8EccYsbUx/"
    },
    {
        "id": "826204d2-0a18-5f15-81c0-1f9730761358",
        "name": "La Bande des idées #92",
        "date_time": "2024-11-04T19:30:00.000Z",
        "bd_ids": [
            "a9f1ba28-8e3f-5925-8f8c-bd63fb271d1b",
            "06d42289-e3ad-57c0-aade-03088507faa9",
            "34373ae6-8241-5dfd-ac94-c657bd97af69",
            "0829463a-3433-53e5-ac54-605311f73a69"
        ],
        "fb_event": "https://www.instagram.com/p/DBd6vEesFeI/"
    },
    {
        "id": "8f478152-30c0-53a8-ae55-0f5108d32a6d",
        "name": "La Bande des idées #93",
        "date_time": "2024-12-02T19:30:00.000Z",
        "bd_ids": [
            "f95d6e61-6426-5b0b-9311-b9e8ecb36b78",
            "fdf7972d-6b2b-5ace-9939-d1b83cedae14",
            "0f55b110-f82c-5092-8299-3149fdc8c9c9",
            "19a60d41-85b5-5230-8e6c-e5537981a6f4"
        ],
        "fb_event": "https://www.facebook.com/events/553573667638100/"
    },
    {
        "id": "28a72776-8abd-56ff-a48b-fe50c1c9add1",
        "name": "La Bande des idées #94",
        "date_time": "2025-01-06T19:30:00.000Z",
        "bd_ids": [
            "c2f61a7e-3816-5686-b9e5-d9556ee77049",
            "e98c4039-8132-5dd6-9489-661fca8f7743",
            "e24b2289-3eba-5581-9e3b-7c3d08251f70",
            "fb6cbc79-3c98-5889-838a-b334b7606395"
        ],
        "fb_event": "https://www.facebook.com/events/479647325144303/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22search%22%7D%2C%7B%22mechanism%22%3A%22attachment%22%2C%22surface%22%3A%22newsfeed%22%7D]%2C%22ref_notif_type%22%3Anull%7D"
    },
    {
        "id": "3d9441c7-6496-5d72-9e60-65b6ea76742a",
        "name": "La Bande des idées #95",
        "date_time": "2025-02-10T19:30:00.000Z",
        "bd_ids": [
            "b0b3870c-0997-5868-bd23-6e08e3cc0aac",
            "1c9e35cc-80d4-5dce-8e80-2874fe876600",
            "4066190a-e2a3-5eda-bb01-cd996e6b7eda",
            "dd62a84b-d5d0-581d-85ff-398583396ee1"
        ],
        "fb_event": "https://www.facebook.com/events/1358841528627237/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22search%22%7D%2C%7B%22mechanism%22%3A%22attachment%22%2C%22surface%22%3A%22newsfeed%22%7D]%2C%22ref_notif_type%22%3Anull%7D"
    },
    {
        "id": "f84bf9dc-cd69-5ea1-8de2-8d84c49c453a",
        "name": "La Bande des idées #96",
        "date_time": "2025-03-03T19:30:00.000Z",
        "bd_ids": [
            "c7c00974-55df-5ddb-9094-599a49fedc04",
            "9a3852a3-baa8-5f2a-aba2-fe494ac3d2d7",
            "d3ae501d-a740-50fa-9b36-23681a63e221",
            "9e1ead2f-e94b-51c4-a530-25ff413b4630"
        ],
        "fb_event": "https://www.facebook.com/events/2532313316972641/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22search%22%7D%2C%7B%22mechanism%22%3A%22attachment%22%2C%22surface%22%3A%22newsfeed%22%7D]%2C%22ref_notif_type%22%3Anull%7D"
    },
    {
        "id": "12815554-e509-5c87-be90-52d0ba1546af",
        "name": "La Bande des idées #97",
        "date_time": "2025-04-07T19:30:00.000Z",
        "bd_ids": [
            "1d9f61ac-e443-5d00-95d6-232abbc96584",
            "8f3dfff9-18f4-517b-956a-375093f86315",
            "9fb8bc86-0c68-5c44-a864-1bd65f4c4114",
            "69fc7e78-c691-52d1-9568-ff25b698eaab"
        ],
        "fb_event": "https://www.facebook.com/events/657561693409078/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22search%22%7D%2C%7B%22mechanism%22%3A%22attachment%22%2C%22surface%22%3A%22newsfeed%22%7D]%2C%22ref_notif_type%22%3Anull%7D"
    },
    {
        "id": "d97b7ed2-8888-563d-a3ab-85aa06e98884",
        "name": "La Bande des idées #98",
        "date_time": "2025-05-05T19:30:00.000Z",
        "bd_ids": [
            "c503e169-f7e8-50eb-bba0-7d391d6a17ce",
            "ebab55bf-6f8b-5ebe-8a63-63805845355c",
            "599583d1-2538-5fdb-ad77-90fc339b3178",
            "510487fd-029b-5a3b-9700-0d11d9582757"
        ],
        "fb_event": "https://www.facebook.com/events/1251013476581314/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22search%22%7D%2C%7B%22mechanism%22%3A%22attachment%22%2C%22surface%22%3A%22newsfeed%22%7D]%2C%22ref_notif_type%22%3Anull%7D"
    },
    {
        "id": "2e34799f-dc59-5357-a523-c317961dfd16",
        "name": "La Bande des idées #99",
        "date_time": "2025-06-02T19:30:00.000Z",
        "bd_ids": [
            "3dddd453-4856-5647-b862-58ee435de96b",
            "78e93b93-fff0-5559-a078-8ca878174a6c",
            "71b57a4d-63c6-5220-b416-c2eacf41695e",
            "def98803-9ae8-50cc-9cb5-3d7c8bbc9c7c"
        ],
        "fb_event": "https://www.facebook.com/events/1709530526598425/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22search%22%7D%2C%7B%22mechanism%22%3A%22attachment%22%2C%22surface%22%3A%22newsfeed%22%7D]%2C%22ref_notif_type%22%3Anull%7D"
    },
    {
        "id": "6421a785-8d16-50f9-8661-42b747c21434",
        "name": "La Bande des idées #100",
        "date_time": "2025-07-04T19:30:00.000Z",
        "bd_ids": [],
        "fb_event": "https://www.facebook.com/events/1257620832398570/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22search%22%7D%2C%7B%22mechanism%22%3A%22attachment%22%2C%22surface%22%3A%22newsfeed%22%7D]%2C%22ref_notif_type%22%3Anull%7D"
    },
    {
        "id": "e86ed83c-1690-5160-a736-d4ab397e1adf",
        "name": "La Bande des idées #101",
        "date_time": "2025-09-01T19:30:00.000Z",
        "bd_ids": [
            "1c16dd39-9b71-570b-adf9-dd949b0876ed",
            "7ecc3faa-7448-57ea-b3c3-3fe72ddd322b",
            "2577974a-9695-5f41-94a9-6ba5ebd90174",
            "89d152e7-f57c-5b0e-8d95-8f5fad2dc896"
        ],
        "fb_event": "https://www.facebook.com/events/1113986430616293/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22search%22%7D%2C%7B%22mechanism%22%3A%22attachment%22%2C%22surface%22%3A%22newsfeed%22%7D]%2C%22ref_notif_type%22%3Anull%7D"
    },
    {
        "id": "f60c9074-4b14-5a21-8163-ab8c49f0d987",
        "name": "La Bande des idées #102",
        "date_time": "2025-10-06T19:30:00.000Z",
        "bd_ids": [
            "55173791-1d25-5974-be37-4ae3bfac5225",
            "d2606770-6e64-56ad-9f24-2c1734030214",
            "ba70089b-dc50-5706-ae33-e7b7f3d3c4ed",
            "c422ca47-19e7-5530-96ae-3099c5ec9dc8"
        ],
        "fb_event": "https://www.facebook.com/events/2504069616626345/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22search%22%7D%2C%7B%22mechanism%22%3A%22attachment%22%2C%22surface%22%3A%22newsfeed%22%7D]%2C%22ref_notif_type%22%3Anull%7D"
    },
    {
        "id": "b148c708-8268-57c5-987d-7c673b310cee",
        "name": "La Bande des idées #103",
        "date_time": "2025-11-03T19:30:00.000Z",
        "bd_ids": [
            "7b60d495-19b6-5aec-83d2-df40acb1d3e8",
            "7afa0be1-9f65-5af9-b8ca-8febc5ccfa4a",
            "ec34073f-32f3-5b74-8e70-eb2e9937a36f",
            "fd110a14-3cb4-5407-a837-b3bae1c9b278"
        ],
        "fb_event": "https://www.facebook.com/events/2437286006666177/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22search%22%7D%2C%7B%22mechanism%22%3A%22attachment%22%2C%22surface%22%3A%22newsfeed%22%7D]%2C%22ref_notif_type%22%3Anull%7D"
    },
    {
        "id": "94e69eb9-e081-52d8-a886-1e8990ac7c1b",
        "name": "La Bande des idées #104",
        "date_time": "2025-12-01T19:30:00.000Z",
        "bd_ids": [
            "af92af68-880b-54ec-9b11-b63ac826149b",
            "0227a664-60ac-5e77-bb89-031cf0893d1e",
            "bb2f4bd6-ea0d-5028-bd8d-d3eb6437888c",
            "543529b3-41ab-5afc-a381-7ed1bfab677b"
        ],
        "fb_event": "https://www.facebook.com/events/1729177091288597/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22search%22%7D%2C%7B%22mechanism%22%3A%22attachment%22%2C%22surface%22%3A%22newsfeed%22%7D]%2C%22ref_notif_type%22%3Anull%7D"
    },
    {
        "id": "22747bbf-a596-5a9a-aaea-99acc760e0d9",
        "name": "La Bande des idées #105",
        "date_time": "2026-01-05T19:30:00.000Z",
        "bd_ids": [
            "11d7eace-ebf2-59d3-a330-cd442d3557a3",
            "1bc85f3d-8932-5b00-b6fd-333b32ee53b9",
            "605a6f52-dfac-5d30-9135-70f21673a9c9",
            "a8920edf-9eb7-5296-9429-4a13002c70c4"
        ],
        "fb_event": "https://www.facebook.com/events/1582503946101897/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22search%22%7D%2C%7B%22mechanism%22%3A%22attachment%22%2C%22surface%22%3A%22newsfeed%22%7D]%2C%22ref_notif_type%22%3Anull%7D"
    },
    {
        "id": "72255258-5a8d-5944-9c4c-0f6f07a6db10",
        "name": "La Bande des idées #106",
        "date_time": "2026-02-02T19:30:00.000Z",
        "bd_ids": [
            "980619c8-13ee-54cf-960c-0ad3a452965b",
            "80dbe48d-5ef6-50a1-8f93-23619b07cbde",
            "30dd4d30-1325-557c-b42b-6ad0894bf6b8",
            "50afc3e1-c60e-5915-b756-8b0760228a32"
        ],
        "fb_event": "https://www.facebook.com/events/740030845824250/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22search%22%7D%2C%7B%22mechanism%22%3A%22attachment%22%2C%22surface%22%3A%22newsfeed%22%7D]%2C%22ref_notif_type%22%3Anull%7D"
    },
    {
        "id": "59b9a96e-b2d0-5d31-9167-293aed303df5",
        "name": "La Bande des idées #107",
        "date_time": "2026-03-02T19:30:00.000Z",
        "bd_ids": [
            "8a2399e8-979b-5ac8-9645-0c778e3f4edc",
            "5cad8b88-954e-5800-bf00-9a0844b4317d",
            "22420ca8-73c3-508a-a4ca-2f9378f14338",
            "46c2d81c-4961-5353-9c99-230e81b565d0"
        ],
        "fb_event": "https://www.facebook.com/events/1291476083029606/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22search%22%7D%2C%7B%22mechanism%22%3A%22attachment%22%2C%22surface%22%3A%22newsfeed%22%7D]%2C%22ref_notif_type%22%3Anull%7D"
    }
];

const bds = [
    {
        "id": "7d723523-0d8a-5c4f-a040-8ff0cca2bc83",
        "title": "Nightly News",
        "event_ids": "d3eafa10-a745-5597-94cb-39521449a60e",
        "author_ids": [
            "fd51ff5e-d84e-5eae-8cd0-e095e96e3dba"
        ],
        "publisher": "Urban",
        "publishing_year": 2014
    },
    {
        "id": "403fb2b2-7948-5aa1-9cbe-2e9e468a9c05",
        "title": "Album de famille",
        "event_ids": "d3eafa10-a745-5597-94cb-39521449a60e",
        "author_ids": [
            "2503e0ea-8931-5458-afc8-90b272d6baa0"
        ],
        "publisher": "L'agrume",
        "publishing_year": 2014
    },
    {
        "id": "d0dbce49-10b1-5c8d-8c0e-20f9c9c83c98",
        "title": "Plus si entente",
        "event_ids": "d3eafa10-a745-5597-94cb-39521449a60e",
        "author_ids": [
            "bdb4565e-067f-56ca-8936-a076246543f4",
            "2027444e-c012-54a3-aec8-f68484ffe1eb"
        ],
        "publisher": "Actes Sud",
        "publishing_year": 2014
    },
    {
        "id": "79894bab-2308-5561-b5ba-b688a26f6672",
        "title": "Saveur coco",
        "event_ids": "d3eafa10-a745-5597-94cb-39521449a60e",
        "author_ids": [
            "a7e5dfca-337c-58a2-8dfb-d1469b851bd9"
        ],
        "publisher": "Dargaud",
        "publishing_year": 2013
    },
    {
        "id": "995dd270-3ead-51df-a96b-919cd922cbea",
        "title": "Magic pen",
        "event_ids": "d5f75c97-9c89-5bba-b8ae-3a252399c8f9",
        "author_ids": [
            "43871c3f-7878-50fd-8691-838780202913"
        ],
        "publisher": "Casterman",
        "publishing_year": 2014
    },
    {
        "id": "76b4d2f1-cdb5-5aae-9479-3daf719d8adb",
        "title": "Palepoli",
        "event_ids": "d5f75c97-9c89-5bba-b8ae-3a252399c8f9",
        "author_ids": [
            "bd00fc5a-20dc-576b-bad2-a3336306d052"
        ],
        "publisher": "IMHO",
        "publishing_year": 2012
    },
    {
        "id": "06175f53-82fc-5df0-a3d6-33be607df9c8",
        "title": "Love in vain",
        "event_ids": "d5f75c97-9c89-5bba-b8ae-3a252399c8f9",
        "author_ids": [
            "402fbda6-fe33-5e95-a64c-4385f9029a38",
            "499e8af8-50a7-57f3-8d89-f5d793796f9d"
        ],
        "publisher": "Glénat",
        "publishing_year": 2014
    },
    {
        "id": "8f57610f-1014-5596-8015-17b94899cd58",
        "title": "Panthere",
        "event_ids": "d5f75c97-9c89-5bba-b8ae-3a252399c8f9",
        "author_ids": [
            "5140c72e-436a-5c58-85af-fde4a31bd1da"
        ],
        "publisher": "Actes Sud",
        "publishing_year": 2014
    },
    {
        "id": "dc370931-0191-5023-a121-09e365903d81",
        "title": "Elle",
        "event_ids": "defb09ef-c4e5-542b-acdf-e0b5029140ba",
        "author_ids": [
            "298957cc-14c1-506e-b3d1-61603cbccd87"
        ],
        "publisher": "L' association",
        "publishing_year": 2014
    },
    {
        "id": "4c2f3bd9-177e-561b-a197-3579528230ae",
        "title": "La lune est blanche",
        "event_ids": "defb09ef-c4e5-542b-acdf-e0b5029140ba",
        "author_ids": [
            "72a26f1a-77d7-531c-a4f4-2018eeb616ce",
            "b678c865-cc90-539b-8e87-b8b7bd979836"
        ],
        "publisher": "Futuropolis",
        "publishing_year": 2014
    },
    {
        "id": "75fc73a4-84d6-50f0-99d9-b7445c392bb8",
        "title": "Mind game",
        "event_ids": "defb09ef-c4e5-542b-acdf-e0b5029140ba",
        "author_ids": [
            "402fbda6-fe33-5e95-a64c-4385f9029a38",
            "499e8af8-50a7-57f3-8d89-f5d793796f9d"
        ],
        "publisher": "IMHO",
        "publishing_year": 2014
    },
    {
        "id": "979cc21c-4c87-5805-b5f5-6f5f3f1606d2",
        "title": "Superman identité secrète",
        "event_ids": "defb09ef-c4e5-542b-acdf-e0b5029140ba",
        "author_ids": [
            "6b6badf0-ebf9-58a7-8c65-f1d065349439",
            "fa90699d-7b23-523d-b295-cb62820b4f9b"
        ],
        "publisher": "Urban Comics",
        "publishing_year": 2014
    },
    {
        "id": "beee135e-1fed-5a0c-9083-dde2ebaec54d",
        "title": "Gros bois",
        "event_ids": "f22d82a6-0cbb-545d-ac4e-4d6766dd929b",
        "author_ids": [
            "0cf5be42-674c-5e17-9e49-7fb184b1431c"
        ],
        "publisher": "Les enfants rouges",
        "publishing_year": 2014
    },
    {
        "id": "913d07b5-d10c-59ba-9f1d-9a2b4c3ad13d",
        "title": "The Wake",
        "event_ids": "f22d82a6-0cbb-545d-ac4e-4d6766dd929b",
        "author_ids": [
            "d4584704-3ebe-5a6f-b8f9-bf17fa741a33",
            "f2c424bc-1c49-51c1-b24c-e35a2aa03969"
        ],
        "publisher": "Urban Comics",
        "publishing_year": 2015
    },
    {
        "id": "db8922f2-954d-5063-9ca0-699e952b7520",
        "title": "Little tulip",
        "event_ids": "f22d82a6-0cbb-545d-ac4e-4d6766dd929b",
        "author_ids": [
            "3bb69f39-439a-56b4-8c8b-84229ff231ba",
            "4d4f91cb-cbe7-5303-8271-d641cf6a6221"
        ],
        "publisher": "Le Lombard",
        "publishing_year": 2014
    },
    {
        "id": "3da21605-8214-54c2-b22c-e217a9c9ce93",
        "title": "Un vrai guerrier ne meurt jamais même si ça signifie la mort",
        "event_ids": "f22d82a6-0cbb-545d-ac4e-4d6766dd929b",
        "author_ids": [
            "0eb89bcb-1cb8-54fb-84dd-ae9d7268c805"
        ],
        "publisher": "Arbitraire",
        "publishing_year": 2015
    },
    {
        "id": "8912ab3c-bf35-5595-bdb9-3c6357a2e7b9",
        "title": "La colère de Fantomas",
        "event_ids": "f9362d2e-7799-5314-8d0f-7bfbebbc45b6",
        "author_ids": [
            "95fa1c0a-912a-55cc-8056-f531d33f882e",
            "48f4c9b6-4f07-53ad-bd78-dfc79b024297"
        ],
        "publisher": "Dargaud",
        "publishing_year": 2015
    },
    {
        "id": "43bbd0e5-e692-5e43-950a-eb10bd288972",
        "title": "En temps de guerre",
        "event_ids": "f9362d2e-7799-5314-8d0f-7bfbebbc45b6",
        "author_ids": [
            "54ffe919-5f0b-553a-bd79-e6c9314fe6ba"
        ],
        "publisher": "Misma",
        "publishing_year": 2015
    },
    {
        "id": "f5bfa282-0bba-5c25-819a-7189c4fa979f",
        "title": "Poison City",
        "event_ids": "f9362d2e-7799-5314-8d0f-7bfbebbc45b6",
        "author_ids": [
            "f22a840a-ae7b-585b-b790-d0e5e0a22043"
        ],
        "publisher": "Ki-Oon",
        "publishing_year": 2015
    },
    {
        "id": "38c7eb79-a784-51a2-bf4e-94b788834ea9",
        "title": "Une tête bien vide",
        "event_ids": "f9362d2e-7799-5314-8d0f-7bfbebbc45b6",
        "author_ids": [
            "617cfc5a-f2fa-5b31-9e82-f0e71d742d38"
        ],
        "publisher": "Atrabile",
        "publishing_year": 2015
    },
    {
        "id": "aaa5174a-d012-5a86-83ff-88ee561cee78",
        "title": "All-Star Superman",
        "event_ids": "5530f067-a32c-51e1-9ad7-97cf775ed705",
        "author_ids": [
            "82b73354-e24a-5897-a4d7-a14c69097c14",
            "950aea29-52b1-5b38-916e-69bd7222eed0"
        ],
        "publisher": "Urban Comics",
        "publishing_year": 2013
    },
    {
        "id": "a8f38346-3d87-5afd-9d0c-423aea300f2a",
        "title": "Rose Profond",
        "event_ids": "5530f067-a32c-51e1-9ad7-97cf775ed705",
        "author_ids": [
            "e2973a8e-b6fe-5378-b489-513f29620f71",
            "06153a78-09a9-505d-94b2-6d01b716bd24"
        ],
        "publisher": "Casterman",
        "publishing_year": 2015
    },
    {
        "id": "09bf28a9-0ce1-5a09-a99c-a21fcffed008",
        "title": "La tendresse des pierres",
        "event_ids": "5530f067-a32c-51e1-9ad7-97cf775ed705",
        "author_ids": [
            "f51793e5-443e-5f81-a04e-65fb91a807e1"
        ],
        "publisher": "Magnani",
        "publishing_year": 2013
    },
    {
        "id": "d6cae607-a1ff-5926-a3f2-bb062c84ffb8",
        "title": "L'encyclopedie des débuts de la terre",
        "event_ids": "5530f067-a32c-51e1-9ad7-97cf775ed705",
        "author_ids": [
            "d8152d45-6327-555b-bab0-5773452caeed"
        ],
        "publisher": "Casterman",
        "publishing_year": 2015
    },
    {
        "id": "ae0bc9de-368c-501b-bad7-5bbbe89576fb",
        "title": "La république du catch",
        "event_ids": "2456ad86-5acc-5301-9bd6-90548d61b552",
        "author_ids": [
            "e09ec5a1-670e-5f3d-9f32-349c029bac21"
        ],
        "publisher": "Casterman",
        "publishing_year": 2013
    },
    {
        "id": "20d228c3-067c-5067-90c8-cb8cc271fe6f",
        "title": "Six-Gun Gorilla",
        "event_ids": "2456ad86-5acc-5301-9bd6-90548d61b552",
        "author_ids": [
            "61b42f2a-c779-5680-b591-6e6128f1a1b7",
            "42648312-3057-56f3-a03c-346bc337f3f8"
        ],
        "publisher": "Ankama",
        "publishing_year": 2015
    },
    {
        "id": "fa873fe7-0449-5f89-8fc9-cfe1654b8041",
        "title": "Renégat",
        "event_ids": "2456ad86-5acc-5301-9bd6-90548d61b552",
        "author_ids": [
            "8de0a770-0d52-5e17-97db-ef10383eb7e6"
        ],
        "publisher": "The Hoochie Coochie",
        "publishing_year": 2012
    },
    {
        "id": "795622ed-bfb2-50c3-8569-fb6f10d3cddd",
        "title": "Jolies ténèbres",
        "event_ids": "2456ad86-5acc-5301-9bd6-90548d61b552",
        "author_ids": [
            "742c3aed-25a1-5152-a908-bd41647dc69a",
            "b818290e-2fbd-585a-828a-479920a33e88"
        ],
        "publisher": "Dupuis",
        "publishing_year": 2009
    },
    {
        "id": "e49de7c1-067d-5937-b900-075d3a2f7799",
        "title": "Le sculpteur",
        "event_ids": "b9550565-c4f9-51fc-b8e1-1259a3c5cc82",
        "author_ids": [
            "3c63d44c-9b4f-596e-9bd5-84c3786f15dd"
        ],
        "publisher": "Rue de Sèvre",
        "publishing_year": 2015
    },
    {
        "id": "cef800c9-32c9-52ab-bf7c-f734ba6c65db",
        "title": "Daddy's girl",
        "event_ids": "b9550565-c4f9-51fc-b8e1-1259a3c5cc82",
        "author_ids": [
            "32df707a-3433-582f-b61e-ae27388d4713"
        ],
        "publisher": "L'Association",
        "publishing_year": 1996
    },
    {
        "id": "7b7682a7-12fd-5c89-81c1-ce4b2ec3cedd",
        "title": "La fille de la plage",
        "event_ids": "b9550565-c4f9-51fc-b8e1-1259a3c5cc82",
        "author_ids": [
            "b4e9729a-f1c7-5994-b791-a4c365333f5b"
        ],
        "publisher": "IMHO",
        "publishing_year": 2014
    },
    {
        "id": "485c9772-b7f3-5b59-99a0-5bc51d90677a",
        "title": "Racket",
        "event_ids": "b9550565-c4f9-51fc-b8e1-1259a3c5cc82",
        "author_ids": [
            "000c49b2-0453-5107-a06f-58c9b1fea271"
        ],
        "publisher": "Futuropolis",
        "publishing_year": 2015
    },
    {
        "id": "70aad9fb-30b1-5177-8126-c531467c028e",
        "title": "Fraction",
        "event_ids": "3b113b35-2d55-51c4-a846-f640bae083f4",
        "author_ids": [
            "b4ba44f4-199f-5988-8479-e4422af71a49"
        ],
        "publisher": "IMHO",
        "publishing_year": 2012
    },
    {
        "id": "f9920e4a-7ba8-5f19-8842-ceaf65dd8b9d",
        "title": "Titeuf - Bienvenue en adolescence",
        "event_ids": "3b113b35-2d55-51c4-a846-f640bae083f4",
        "author_ids": [
            "94dabec5-6d21-52f5-bcb2-0298eeca942e"
        ],
        "publisher": "Glénat",
        "publishing_year": 2015
    },
    {
        "id": "9f0067bc-02b7-50da-a83e-61b896fc352d",
        "title": "Hobo Mom",
        "event_ids": "3b113b35-2d55-51c4-a846-f640bae083f4",
        "author_ids": [
            "40a78c44-4310-5562-8dc7-76d43d290bda"
        ],
        "publisher": "L'Employé du Moi",
        "publishing_year": 2015
    },
    {
        "id": "da2485f6-6f49-5a22-a601-34c06f8fe55f",
        "title": "Pauline à Paris",
        "event_ids": "3b113b35-2d55-51c4-a846-f640bae083f4",
        "author_ids": [
            "86b380e5-e629-5310-a14c-a81874f5b0be"
        ],
        "publisher": "FLBLB",
        "publishing_year": 2015
    },
    {
        "id": "fb96800d-99ad-51c1-a1e8-f27c7d8fbb10",
        "title": "Cigish",
        "event_ids": "00e27df2-3483-5397-bfdb-e40b84d0dd1c",
        "author_ids": [
            "b51e43e0-93f2-5e19-a4ea-6c9847f8a7e3"
        ],
        "publisher": "Ankama",
        "publishing_year": 2015
    },
    {
        "id": "94bd0510-12eb-51a0-a26e-0c444a702785",
        "title": "Le grand méchant renard",
        "event_ids": "00e27df2-3483-5397-bfdb-e40b84d0dd1c",
        "author_ids": [
            "bb4e4e79-2608-504d-8924-888397c60925"
        ],
        "publisher": "Delcourt",
        "publishing_year": 2015
    },
    {
        "id": "36e7eb28-ed60-5818-bc3a-eb39ae1e3105",
        "title": "Tel qu'en lui même enfin",
        "event_ids": "00e27df2-3483-5397-bfdb-e40b84d0dd1c",
        "author_ids": [
            "073d9082-a5d3-506a-985d-eb0aebe059a8"
        ],
        "publisher": "L'Association",
        "publishing_year": 2015
    },
    {
        "id": "331c85b8-47f5-56b5-bdb2-c4ad8b36a229",
        "title": "Mitterand, un jeune homme de droite",
        "event_ids": "00e27df2-3483-5397-bfdb-e40b84d0dd1c",
        "author_ids": [
            "ce0db7bb-6bd3-522e-bc15-0b4f81ad598e",
            "ecb4c9b9-3668-504e-b85a-91058c2412a2"
        ],
        "publisher": "Rue de Sèvres",
        "publishing_year": 2015
    },
    {
        "id": "6dcd8372-864e-593c-aa7b-d1c4421ca80a",
        "title": "Facteur pour femmes",
        "event_ids": "590aeb5c-04d1-5591-8c71-8f194fe9dd1a",
        "author_ids": [
            "e9d80524-250a-5eed-b35a-7c4e80bac050",
            "9425decb-3a8b-5e37-aac5-5ccb7a8b06d7"
        ],
        "publisher": "Grand Angle",
        "publishing_year": 2015
    },
    {
        "id": "ee4b52be-c659-5eff-ae4e-44cebfeb024c",
        "title": "Trashed",
        "event_ids": "590aeb5c-04d1-5591-8c71-8f194fe9dd1a",
        "author_ids": [
            "96f050f1-d364-5995-835b-e0735f743da1"
        ],
        "publisher": "çà et là",
        "publishing_year": 2015
    },
    {
        "id": "e9a8d3e6-7671-5522-9438-1ca74a7d4a54",
        "title": "Ladyboy vs Yakuzas",
        "event_ids": "590aeb5c-04d1-5591-8c71-8f194fe9dd1a",
        "author_ids": [
            "9ce7b8ea-d8e8-5148-be02-bd7675f97a2e"
        ],
        "publisher": "Akata",
        "publishing_year": 2015
    },
    {
        "id": "bab472e5-dba8-56e8-94b4-eaca12df0767",
        "title": "Le temps est proche",
        "event_ids": "590aeb5c-04d1-5591-8c71-8f194fe9dd1a",
        "author_ids": [
            "0de81355-7467-5c84-ac5a-fda83bddd329"
        ],
        "publisher": "The Hoochie Coochie",
        "publishing_year": 2012
    },
    {
        "id": "5879ed08-b528-54fa-b889-cb9b6654c5e6",
        "title": "Comment faire fortune en juin 40",
        "event_ids": "fc63aa8e-600f-5543-807f-73035f19248e",
        "author_ids": [
            "55310ba7-320a-5abb-8b39-eff41549b0f1",
            "5c38e890-27df-567f-9c6f-bcec8ceea617",
            "a0303dba-bfa5-5dbc-8c2a-7cc1352a5f7e"
        ],
        "publisher": "Casterman",
        "publishing_year": 2015
    },
    {
        "id": "c8efe667-cfa0-5265-92b3-8f32fbeb53b1",
        "title": "Gazoline l'intégrale",
        "event_ids": "fc63aa8e-600f-5543-807f-73035f19248e",
        "author_ids": [
            "33d9e522-4553-5c30-84d9-90627de2766d"
        ],
        "publisher": "Les Requins Marteaux",
        "publishing_year": 2015
    },
    {
        "id": "0ee6ba43-46ad-5c80-8a2e-5114850d943b",
        "title": "Vater und sohn",
        "event_ids": "fc63aa8e-600f-5543-807f-73035f19248e",
        "author_ids": [
            "6784186c-7620-5323-ba49-f65e51e6ae6f"
        ],
        "publisher": "Warum / Vraoum",
        "publishing_year": 2015
    },
    {
        "id": "bfaec5be-c8a1-5bc8-a268-c883a4cd4ffe",
        "title": "Green Lantern & Green Arrow",
        "event_ids": "fc63aa8e-600f-5543-807f-73035f19248e",
        "author_ids": [
            "1447e129-555d-532d-8df9-d42e6407feef",
            "21ea33cb-1507-5e60-80c3-10871c80788b",
            "dd7e20bf-bcd1-5b90-a7d5-96c2ef461276"
        ],
        "publisher": "Urban Comics",
        "publishing_year": 2014
    },
    {
        "id": "5cad8b88-954e-5800-bf00-9a0844b4317d",
        "title": "Carnet de santé foireuse",
        "event_ids": "577662aa-e0e0-5fc7-9538-eea8c644fac8",
        "author_ids": [
            "93d9e02c-ca19-59ba-a0ff-fe436c3a55bf"
        ],
        "publisher": "Delcourt",
        "publishing_year": 2016
    },
    {
        "id": "a1271973-c370-5a5f-a7d4-8feb30577f49",
        "title": "Dernier arpenteur des sables",
        "event_ids": "577662aa-e0e0-5fc7-9538-eea8c644fac8",
        "author_ids": [
            "fbc80bf7-51eb-58fc-b8c2-66228d9518a3"
        ],
        "publisher": "Cambourakis",
        "publishing_year": 2015
    },
    {
        "id": "169ce90d-4993-5277-b4b4-898b948ae30b",
        "title": "Feu de paille",
        "event_ids": "577662aa-e0e0-5fc7-9538-eea8c644fac8",
        "author_ids": [
            "0ca16d5c-a8ba-5db2-9f06-f74b056d9c83"
        ],
        "publisher": "6 Pieds Sous Terre",
        "publishing_year": 2015
    },
    {
        "id": "c11af8d5-9a5d-5d5d-8a37-806ab326e55e",
        "title": "Stigmates",
        "event_ids": "577662aa-e0e0-5fc7-9538-eea8c644fac8",
        "author_ids": [
            "1a15581a-5279-5430-876c-2e8ffa8ff9a9"
        ],
        "publisher": "Casterman",
        "publishing_year": 2015
    },
    {
        "id": "112b74f7-40f7-535a-aab9-b13d3c94c4d2",
        "title": "Punk Rock Jesus",
        "event_ids": "9892d986-cf7a-5e39-8f31-7e0e110e3565",
        "author_ids": [
            "f2c424bc-1c49-51c1-b24c-e35a2aa03969"
        ],
        "publisher": "Urban Comics",
        "publishing_year": 2013
    },
    {
        "id": "acef282e-003f-5e71-a1db-09b55471da17",
        "title": "L'attente infinie",
        "event_ids": "9892d986-cf7a-5e39-8f31-7e0e110e3565",
        "author_ids": [
            "c1ffebeb-922e-5aec-a97e-43302c30360d"
        ],
        "publisher": "L'Agrume",
        "publishing_year": 2015
    },
    {
        "id": "429db244-0244-5954-aed2-67933069011e",
        "title": "La paresse du panda",
        "event_ids": "9892d986-cf7a-5e39-8f31-7e0e110e3565",
        "author_ids": [
            "d0b44328-312e-5462-94fc-6071926328cf"
        ],
        "publisher": "Casterman",
        "publishing_year": 2016
    },
    {
        "id": "a287fabc-b371-534f-b5ae-bce6b907b35f",
        "title": "Blues",
        "event_ids": "9892d986-cf7a-5e39-8f31-7e0e110e3565",
        "author_ids": [
            "64050749-07c1-53a7-82b9-41a75f355e82"
        ],
        "publisher": "Mosquito",
        "publishing_year": 2007
    },
    {
        "id": "ea17e67e-3aed-5734-bee3-23d291cb2e65",
        "title": "Ici",
        "event_ids": "634fc1df-6058-5247-a08c-fad69ce34c2e",
        "author_ids": [
            "d95d8155-cb3d-51b6-aa89-a6c1c7d4efda"
        ],
        "publisher": "Casterman",
        "publishing_year": 2015
    },
    {
        "id": "5c6c2ec3-ceeb-5561-af33-6dc9d7f3f5c4",
        "title": "Luthor",
        "event_ids": "634fc1df-6058-5247-a08c-fad69ce34c2e",
        "author_ids": [
            "307d6d57-5e9c-5093-81f8-c14ebd1a70bf",
            "87b5bd4e-962b-5128-b63a-fcb5a620a097"
        ],
        "publisher": "Urban Comics",
        "publishing_year": 2016
    },
    {
        "id": "1fe8553a-dc4f-557c-b0c8-ed285d25d513",
        "title": "Capitaine Mulet",
        "event_ids": "634fc1df-6058-5247-a08c-fad69ce34c2e",
        "author_ids": [
            "7ca4b9c7-18bd-5d69-9771-bd4f479f8b57"
        ],
        "publisher": "Editions 2024",
        "publishing_year": 2016
    },
    {
        "id": "d7db5c18-6776-5197-b68c-f61569bd178a",
        "title": "Commando Culotte",
        "event_ids": "634fc1df-6058-5247-a08c-fad69ce34c2e",
        "author_ids": [
            "07e138d4-c5e0-5e13-81c4-b924dca78d61"
        ],
        "publisher": "Ankama",
        "publishing_year": 2016
    },
    {
        "id": "8cf6bed4-1fb3-55c1-a44b-1d26a4467c32",
        "title": "Mickey's craziest adventures",
        "event_ids": "77c01a2a-d1e6-590e-b030-9b97131b7e52",
        "author_ids": [
            "29c51d18-72d7-5715-8d93-7f49418467af",
            "63e6bbf9-501c-5cab-a447-df8eca94278c"
        ],
        "publisher": "Glénat",
        "publishing_year": 2016
    },
    {
        "id": "f2860692-948f-5d47-b998-60f799a21268",
        "title": "Presque",
        "event_ids": "77c01a2a-d1e6-590e-b030-9b97131b7e52",
        "author_ids": [
            "d46c7036-5dcf-5b2b-8dc5-d09fabdacbb2"
        ],
        "publisher": "Les Rêveurs",
        "publishing_year": 2010
    },
    {
        "id": "69f9074f-83c0-57ba-977b-1125d2fbae16",
        "title": "Medley",
        "event_ids": "77c01a2a-d1e6-590e-b030-9b97131b7e52",
        "author_ids": [
            "5ad0a9e1-5ffa-5c14-a110-f2130ce3514f"
        ],
        "publisher": "Même Pas Mal",
        "publishing_year": 2016
    },
    {
        "id": "e71a06a2-fc10-56f0-b0a6-f5b1ec6ce8d4",
        "title": "Journal",
        "event_ids": "77c01a2a-d1e6-590e-b030-9b97131b7e52",
        "author_ids": [
            "e7bad250-6da0-56ae-ab7c-bb32c2243587"
        ],
        "publisher": "L'Agrume",
        "publishing_year": 2014
    },
    {
        "id": "3bb145fc-9ba1-546b-84c5-b9bd43d58ef3",
        "title": "L'odeur des garçons affamés",
        "event_ids": "b0b01187-3e41-530a-b69d-1b778156244a",
        "author_ids": [
            "5dffb67a-5aac-5df7-8cff-c42c4085749e",
            "2f4e23e5-9feb-53ab-beae-4555370c8f0d"
        ],
        "publisher": "Casterman BD",
        "publishing_year": 2016
    },
    {
        "id": "80fb2922-29f9-5231-ba34-224676df214b",
        "title": "Le confesseur sauvage",
        "event_ids": "b0b01187-3e41-530a-b69d-1b778156244a",
        "author_ids": [
            "7fe75a35-1d64-517a-885f-630c30ee6ba0"
        ],
        "publisher": "Glénat",
        "publishing_year": 2015
    },
    {
        "id": "31218cb7-1c1c-5c1e-ba45-3383eb2db2a4",
        "title": "Orange",
        "event_ids": "b0b01187-3e41-530a-b69d-1b778156244a",
        "author_ids": [
            "c5e6aaf1-2b53-5f0e-bce2-0c4c94f86c6f"
        ],
        "publisher": "Akata",
        "publishing_year": 2014
    },
    {
        "id": "d6777df6-7ff7-5d60-883a-8b4a3ea24742",
        "title": "Les spectateurs",
        "event_ids": "b0b01187-3e41-530a-b69d-1b778156244a",
        "author_ids": [
            "09ba303e-ed68-5c29-bac3-42f3ca9dc165"
        ],
        "publisher": "Casterman BD",
        "publishing_year": 2016
    },
    {
        "id": "0f4c7769-b9a0-5d86-90c2-0dab9cdecac5",
        "title": "L'homme qui tua Lucky Luke",
        "event_ids": "ebcd603e-64b3-5e3d-bb18-e26dcae09acf",
        "author_ids": [
            "453525aa-7f27-5d42-ba7b-d5459af791fc"
        ],
        "publisher": "Casterman",
        "publishing_year": 2016
    },
    {
        "id": "50457d0a-d275-54ae-a701-73038d4557e5",
        "title": "Hors-jeu",
        "event_ids": "ebcd603e-64b3-5e3d-bb18-e26dcae09acf",
        "author_ids": [
            "a1538e2c-43f9-5a42-8d71-008ad928bf75"
        ],
        "publisher": "L'Agrume",
        "publishing_year": 2016
    },
    {
        "id": "ff97eec9-4561-5965-b9fd-31a81ed88ca1",
        "title": "Le concile des arbres",
        "event_ids": "ebcd603e-64b3-5e3d-bb18-e26dcae09acf",
        "author_ids": [
            "d9ccf51f-773d-5fc2-96b6-c595993dc4d5",
            "9329ecf2-fb88-5cda-93d0-4d796212135a"
        ],
        "publisher": "Dargaud",
        "publishing_year": 2016
    },
    {
        "id": "f6807abd-c884-551c-ad68-32d7182e64bc",
        "title": "White Trash",
        "event_ids": "ebcd603e-64b3-5e3d-bb18-e26dcae09acf",
        "author_ids": [
            "c533d6df-4b35-5261-9157-fa3cef0e4088"
        ],
        "publisher": "Ankama",
        "publishing_year": 2016
    },
    {
        "id": "13cec0e3-d7e3-54da-be39-8ea04750452b",
        "title": "Kobane Calling",
        "event_ids": "acaef519-c1b3-5690-84b1-d8fb25759813",
        "author_ids": [
            "8d89626c-33ca-5927-9738-0bf520f4b52e"
        ],
        "publisher": "Cambourakis​",
        "publishing_year": 2016
    },
    {
        "id": "4855cab9-a793-5a3b-b9ed-a1ae11a4cb96",
        "title": "L'origine du monde",
        "event_ids": "acaef519-c1b3-5690-84b1-d8fb25759813",
        "author_ids": [
            "6036d73a-1f6b-581b-8e41-74a385c4be82"
        ],
        "publisher": "Rackham",
        "publishing_year": 2016
    },
    {
        "id": "b84e2de9-9773-5fb3-b098-95600aabefb4",
        "title": "Les fils d'El Topo",
        "event_ids": "acaef519-c1b3-5690-84b1-d8fb25759813",
        "author_ids": [
            "e98c2e27-b0f3-5c53-b4b4-6deb8dd0969b",
            "a0b94843-ddbb-5e2e-94f4-31715a79ae96"
        ],
        "publisher": "Glénat",
        "publishing_year": 2016
    },
    {
        "id": "6abe3396-863c-534c-ab1f-f19543d6c60d",
        "title": "Gros Ours et Petit Lapin",
        "event_ids": "acaef519-c1b3-5690-84b1-d8fb25759813",
        "author_ids": [
            "8d7dbf62-af3b-5183-9758-a74bff3e93b2"
        ],
        "publisher": "Misma",
        "publishing_year": 2016
    },
    {
        "id": "72f2081f-6273-5dc2-8c7b-28dc3370c098",
        "title": "Ghost World",
        "event_ids": "81b7b345-17ae-599b-8c17-b38aafc42040",
        "author_ids": [
            "64bcc6da-c0b5-540c-a6a6-eaeb6731bbf8"
        ],
        "publisher": "Cornélius",
        "publishing_year": 2016
    },
    {
        "id": "2e080007-73f3-551b-9c26-e8e9ebec19d2",
        "title": "Gunnm",
        "event_ids": "81b7b345-17ae-599b-8c17-b38aafc42040",
        "author_ids": [
            "65e00d00-102a-5d11-a8ee-1ae12e5f8022"
        ],
        "publisher": "Glénat",
        "publishing_year": 2016
    },
    {
        "id": "b5c177d6-e429-538f-84b3-6f857b20a7a4",
        "title": "Vive la marée !",
        "event_ids": "81b7b345-17ae-599b-8c17-b38aafc42040",
        "author_ids": [
            "343a491e-3575-5f01-bd10-fce806418d2d",
            "63d2e556-4c79-555b-afec-1eb4a3f509a5"
        ],
        "publisher": "Futuropolis",
        "publishing_year": 2015
    },
    {
        "id": "9491f949-140c-5092-9add-d05dc3983fe1",
        "title": "Monsieur Léotard",
        "event_ids": "81b7b345-17ae-599b-8c17-b38aafc42040",
        "author_ids": [
            "eb457afe-c7d7-5465-91f5-1f76bbd153d4",
            "aabdfb6d-def7-59e7-aef7-caf4f826425e"
        ],
        "publisher": "Çà et là",
        "publishing_year": 2016
    },
    {
        "id": "bde8dc28-1f8e-58e9-8de4-8efd46178c54",
        "title": "L'essentiel de Gouines à suivre",
        "event_ids": "eb52c998-b16a-55d6-a25e-fc780089bc5b",
        "author_ids": [
            "c31ac25f-8577-51a4-8112-3280350d8f34"
        ],
        "publisher": "Même Pas Mal",
        "publishing_year": 2016
    },
    {
        "id": "9ac45906-4b6a-5ca4-805b-f64aec4b90bc",
        "title": "Spirou, La lumière de Bornéo",
        "event_ids": "eb52c998-b16a-55d6-a25e-fc780089bc5b",
        "author_ids": [
            "f780ae12-bdb3-5934-a7eb-c1a220d6c1f7",
            "095fe88f-e6bc-523c-a338-d927d8a46767"
        ],
        "publisher": "Dupuis",
        "publishing_year": 2016
    },
    {
        "id": "c4a296ae-92a4-59dc-9301-4a603a7cffd0",
        "title": "Police Lunaire",
        "event_ids": "eb52c998-b16a-55d6-a25e-fc780089bc5b",
        "author_ids": [
            "82f0f18e-ef7e-5f41-8047-ad16d91e05e4"
        ],
        "publisher": "Editions 2024",
        "publishing_year": 2016
    },
    {
        "id": "562e5012-19b0-5794-aa0e-4636a143312f",
        "title": "Aventures de Luther Arkwright",
        "event_ids": "eb52c998-b16a-55d6-a25e-fc780089bc5b",
        "author_ids": [
            "2f89aaac-ebdd-5a34-a0a8-e93588b567e4"
        ],
        "publisher": "Kymera Comics",
        "publishing_year": 2006
    },
    {
        "id": "163d1778-437a-5b0b-a41c-477e1740f9d6",
        "title": "Cot Cot",
        "event_ids": "d7bb79a6-c63f-532e-9f9a-c52593db9321",
        "author_ids": [
            "74fe19ba-aed1-535a-b8e0-d23ecae07b52"
        ],
        "publisher": "Atrabile",
        "publishing_year": 2003
    },
    {
        "id": "3ffeb194-5cc8-5d05-ade9-964f5999aa79",
        "title": "Une féssée et au lit",
        "event_ids": "d7bb79a6-c63f-532e-9f9a-c52593db9321",
        "author_ids": [
            "aedca89a-5fbd-5370-bd4f-613e59392e1e"
        ],
        "publisher": "The Hoochie Coochie",
        "publishing_year": 2016
    },
    {
        "id": "3dc033eb-0039-59b2-a5c3-2dd8754bcfcc",
        "title": "Heartful Company",
        "event_ids": "d7bb79a6-c63f-532e-9f9a-c52593db9321",
        "author_ids": [
            "ecc84076-df42-5c48-b1a3-d3d8a57b3771",
            "bd3ae08f-db85-5ec7-997d-14285b672739"
        ],
        "publisher": "IMHO",
        "publishing_year": 2013
    },
    {
        "id": "0d8ca287-8e3d-55a9-9f4f-bbe8a1a62c40",
        "title": "Super Sourde",
        "event_ids": "d7bb79a6-c63f-532e-9f9a-c52593db9321",
        "author_ids": [
            "160a3ea0-3de2-5647-bd35-de0856ad7ff1"
        ],
        "publisher": "Les Arènes",
        "publishing_year": 2015
    },
    {
        "id": "5a7dd53b-1495-5663-bea2-733fedd1d228",
        "title": "Stupor Mundi",
        "event_ids": "7e9194c4-701f-58d0-801d-6b0a204ec1d4",
        "author_ids": [
            "b84a8b0d-c5d4-50a0-98ca-7499c46b7968"
        ],
        "publisher": "Gallimard BD",
        "publishing_year": 2016
    },
    {
        "id": "4335f95a-162b-55fd-bc33-9ae6270eaa96",
        "title": "Otto l'homme réécrit",
        "event_ids": "7e9194c4-701f-58d0-801d-6b0a204ec1d4",
        "author_ids": [
            "a0e8081c-c789-5249-a9ad-938d911d3d15"
        ],
        "publisher": "Delcourt",
        "publishing_year": 2016
    },
    {
        "id": "92d4a711-7df9-52a6-aef4-35cf71bbc16a",
        "title": "Tulipe",
        "event_ids": "7e9194c4-701f-58d0-801d-6b0a204ec1d4",
        "author_ids": [
            "7ca4b9c7-18bd-5d69-9771-bd4f479f8b57"
        ],
        "publisher": "Editions 2024",
        "publishing_year": 2016
    },
    {
        "id": "09bd361d-294b-548e-81d2-a24ce73e755a",
        "title": "La pipe de Marcos",
        "event_ids": "7e9194c4-701f-58d0-801d-6b0a204ec1d4",
        "author_ids": [
            "5a27bd93-6368-5a71-863e-b2984c27b7da"
        ],
        "publisher": "Rackham",
        "publishing_year": 2005
    },
    {
        "id": "1d56642e-0dc1-5f4a-aae2-0fa94df543fd",
        "title": "Shangri-la",
        "event_ids": "a25ef389-a3d0-5e2e-a153-2e280ed21d81",
        "author_ids": [
            "1cc29f88-7e7f-56ef-b1db-5e3a60803a8b"
        ],
        "publisher": "Ankama",
        "publishing_year": 2016
    },
    {
        "id": "7c7c3feb-134e-5fcd-8be5-c580ee005cb1",
        "title": "Scalp",
        "event_ids": "a25ef389-a3d0-5e2e-a153-2e280ed21d81",
        "author_ids": [
            "8fe7fe5d-f5d1-57fa-9b23-8613e9714774"
        ],
        "publisher": "Futuropolis",
        "publishing_year": 2017
    },
    {
        "id": "d6aa2f0e-42e0-5e88-9aca-0f988aaf0156",
        "title": "Charlie Chan hock Chye",
        "event_ids": "a25ef389-a3d0-5e2e-a153-2e280ed21d81",
        "author_ids": [
            "0afb0661-1df4-536c-9666-10c4b38bb243"
        ],
        "publisher": "Urban Comics",
        "publishing_year": 2017
    },
    {
        "id": "8a70367d-933d-5179-ad05-41d287a8027e",
        "title": "Pelote dans la fumée",
        "event_ids": "a25ef389-a3d0-5e2e-a153-2e280ed21d81",
        "author_ids": [
            "1f5f75e0-7638-50f5-80af-9cd35b1db3a9"
        ],
        "publisher": "Actes Sud Bd",
        "publishing_year": 2013
    },
    {
        "id": "264198c3-9db1-53e1-9cf2-57062511f327",
        "title": "Sunny",
        "event_ids": "a162a1f8-1fec-55a0-838d-7c9173f88142",
        "author_ids": [
            "038c7ffd-f91b-5d74-85b4-4ad2c6c32bf3"
        ],
        "publisher": "Kana",
        "publishing_year": 2014
    },
    {
        "id": "fb7e1f82-d227-5650-85b7-c44a4f634109",
        "title": "Louis Riel",
        "event_ids": "a162a1f8-1fec-55a0-838d-7c9173f88142",
        "author_ids": [
            "cdc82420-f432-5f59-a469-f2e496e2ec4d"
        ],
        "publisher": "La Pastèque",
        "publishing_year": 2004
    },
    {
        "id": "9915da9c-e3bf-579d-9399-0cca6f6854ed",
        "title": "Je, François Villon",
        "event_ids": "a162a1f8-1fec-55a0-838d-7c9173f88142",
        "author_ids": [
            "37c48d00-bc91-517c-b977-e253bcc19204"
        ],
        "publisher": "Delcourt",
        "publishing_year": 2017
    },
    {
        "id": "871a5231-dd60-5c65-9b18-723b1565ffa1",
        "title": "La structure est pourrie camarade",
        "event_ids": "a162a1f8-1fec-55a0-838d-7c9173f88142",
        "author_ids": [
            "d7ebbe2d-e613-5ff8-939b-63886c183c10",
            "6c202026-ad9b-5d9f-a7cb-35d1e0009667"
        ],
        "publisher": "Actes Sud Bd",
        "publishing_year": 2017
    },
    {
        "id": "975d271b-e1e0-54f8-9273-2debfe877e0f",
        "title": "Une soeur",
        "event_ids": "4773d958-16dc-5d09-ac56-048ca6df63b8",
        "author_ids": [
            "552512e4-a3e7-5246-89cf-9ddee4ca5e17"
        ],
        "publisher": "Casterman",
        "publishing_year": 2017
    },
    {
        "id": "49643a22-7c3c-590e-909d-2b458a3c9812",
        "title": "Solanin",
        "event_ids": "4773d958-16dc-5d09-ac56-048ca6df63b8",
        "author_ids": [
            "b4e9729a-f1c7-5994-b791-a4c365333f5b"
        ],
        "publisher": "Kana",
        "publishing_year": 2007
    },
    {
        "id": "5a8ed5c1-88a2-5654-88d7-c1d974ade6b3",
        "title": "Quoi de plus normal qu'infliger la vie?",
        "event_ids": "4773d958-16dc-5d09-ac56-048ca6df63b8",
        "author_ids": [
            "38a340c0-3423-5b21-8f83-9db6313b7522"
        ],
        "publisher": "Arbitraire",
        "publishing_year": 2016
    },
    {
        "id": "1446edf4-27ba-5484-9124-b0655c28fa02",
        "title": "Big Kids",
        "event_ids": "4773d958-16dc-5d09-ac56-048ca6df63b8",
        "author_ids": [
            "befc47ec-c72f-58e3-8519-a28173853443"
        ],
        "publisher": "Atrabile",
        "publishing_year": 2017
    },
    {
        "id": "5864aefd-c512-5acd-bfd4-654a9577e01f",
        "title": "C'est un oiseau",
        "event_ids": "41d4751a-0f18-5d59-86d2-8e48b38d35fb",
        "author_ids": [
            "c49f0cdc-1a16-51f1-aec9-b96dbb3ecfab",
            "f32dd3ed-2196-56e7-bb1a-41d07e59b2f7"
        ],
        "publisher": "Urban Comics",
        "publishing_year": 2016
    },
    {
        "id": "2ad5e35b-e8b1-57e4-b566-1e1eb9fdb2aa",
        "title": "Paysage après la bataille",
        "event_ids": "41d4751a-0f18-5d59-86d2-8e48b38d35fb",
        "author_ids": [
            "bf478f85-abfd-5914-acc2-eb7ae099bad6",
            "b0f40b74-5f7d-5e03-9420-f2c5732abccf"
        ],
        "publisher": "Actes Sud BD",
        "publishing_year": 2016
    },
    {
        "id": "a3a08375-70c5-5185-aa11-1970757201c6",
        "title": "Carnation",
        "event_ids": "41d4751a-0f18-5d59-86d2-8e48b38d35fb",
        "author_ids": [
            "c8a55c08-f0a1-57c9-a276-d164183edeb8"
        ],
        "publisher": "Casterman",
        "publishing_year": 2017
    },
    {
        "id": "506574d1-5d79-5ea8-a30b-2de7549df7f9",
        "title": "Le Cauchemar argenté",
        "event_ids": "41d4751a-0f18-5d59-86d2-8e48b38d35fb",
        "author_ids": [
            "926f14bf-2ff3-58be-b4a8-bfc69cd4f9fb"
        ],
        "publisher": "Mosquito",
        "publishing_year": 2017
    },
    {
        "id": "ff441b8a-e7d8-56d6-889a-43edd430e38d",
        "title": "Epiphania",
        "event_ids": "962b55da-7635-5b79-975c-44b8cd63497b",
        "author_ids": [
            "d98bf4ce-fabc-518d-9a7b-415fda62817e"
        ],
        "publisher": "Casterman",
        "publishing_year": 2017
    },
    {
        "id": "77b2a2e9-cb9b-5999-9b0a-81ffd06b392c",
        "title": "Never go home",
        "event_ids": "962b55da-7635-5b79-975c-44b8cd63497b",
        "author_ids": [
            "b52d45f1-1dd3-55f6-bb85-67fcb65cea0b",
            "e0985a1b-4ff4-5b75-8ca7-3067999c69d5",
            "91ea0576-e99f-559b-8107-43c5a962ce61"
        ],
        "publisher": "Glénat Comics",
        "publishing_year": 2017
    },
    {
        "id": "83e86609-2b52-52ab-b6f2-454f3f4f1588",
        "title": "Cendres",
        "event_ids": "962b55da-7635-5b79-975c-44b8cd63497b",
        "author_ids": [
            "ef93712c-4767-58cf-bde5-b0d4e4447cc3"
        ],
        "publisher": "Rackham",
        "publishing_year": 2015
    },
    {
        "id": "87fa356f-0b28-50f7-ad0f-7608ec05705e",
        "title": "Johnny Ryan touche le fond",
        "event_ids": "962b55da-7635-5b79-975c-44b8cd63497b",
        "author_ids": [
            "b3477ea0-acf7-5378-921f-003ae0d32b4b"
        ],
        "publisher": "Misma",
        "publishing_year": 2017
    },
    {
        "id": "a968de90-88cc-5e8a-b553-d7298afa9d74",
        "title": "La saga de Grimr",
        "event_ids": "e53c882f-3627-5b43-b1d8-ee7469a56d93",
        "author_ids": [
            "035c9f3a-3ce1-5d0c-8ea8-44c33fa53465"
        ],
        "publisher": "Delcourt",
        "publishing_year": 2017
    },
    {
        "id": "9c926764-7669-5585-8219-0f0fb31f3498",
        "title": "Betty Boob",
        "event_ids": "e53c882f-3627-5b43-b1d8-ee7469a56d93",
        "author_ids": [
            "1cb65ab4-91ec-58a4-b86b-15848303925f",
            "48f4c9b6-4f07-53ad-bd78-dfc79b024297"
        ],
        "publisher": "Casterman",
        "publishing_year": 2017
    },
    {
        "id": "920c0bc3-909f-517c-8194-eec53442da3a",
        "title": "FUN",
        "event_ids": "e53c882f-3627-5b43-b1d8-ee7469a56d93",
        "author_ids": [
            "e8be046b-4ab7-5bf1-b064-43221857647d",
            "a12a8cd7-361a-5455-a8da-350b55b581b1"
        ],
        "publisher": "Ici Même",
        "publishing_year": 2015
    },
    {
        "id": "765d65d1-e762-5976-bda4-410a49745faf",
        "title": "Anarcoma",
        "event_ids": "e53c882f-3627-5b43-b1d8-ee7469a56d93",
        "author_ids": [
            "db9a12ff-381c-54a8-847d-511a1a18e953"
        ],
        "publisher": "Misma",
        "publishing_year": 2017
    },
    {
        "id": "b7cfe93d-0614-51ed-9121-129779a36201",
        "title": "My Hero Academia",
        "event_ids": "016d6e71-04fa-5718-bbc4-42c714e709a9",
        "author_ids": [
            "685f38e5-4320-5e62-9650-764382aed9a2"
        ],
        "publisher": "Ki-oon",
        "publishing_year": 2014
    },
    {
        "id": "3c1a9222-8bc6-5dc9-9f80-8d86851d8aec",
        "title": "Dead Dead Demon's De dedede Destruction",
        "event_ids": "016d6e71-04fa-5718-bbc4-42c714e709a9",
        "author_ids": [
            "b4e9729a-f1c7-5994-b791-a4c365333f5b"
        ],
        "publisher": "Kana",
        "publishing_year": 2016
    },
    {
        "id": "18b43f2b-e8c9-553e-92e1-c13027830753",
        "title": "Une collision accidentelle sur le chemin de l’école peut elle donner lieu à un baiser ?",
        "event_ids": "016d6e71-04fa-5718-bbc4-42c714e709a9",
        "author_ids": [
            "b4ba44f4-199f-5988-8479-e4422af71a49"
        ],
        "publisher": "IMHO",
        "publishing_year": 2013
    },
    {
        "id": "42bcdd54-8a27-5fbc-b679-565b1ae82f57",
        "title": "Kitaro le repoussant",
        "event_ids": "016d6e71-04fa-5718-bbc4-42c714e709a9",
        "author_ids": [
            "8c8cfd0d-2ff8-55d1-bf5e-f83410306fb1"
        ],
        "publisher": "Cornélius",
        "publishing_year": 2011
    },
    {
        "id": "0ef59048-c3fb-5ea8-b650-75dafe1998cf",
        "title": "The Wicked + The Divine",
        "event_ids": "99984239-be4b-5527-ac6f-2efffaa923c7",
        "author_ids": [
            "081b0e0b-4da2-5f56-bf65-0bd4159a6420",
            "0708b86c-85b5-5300-9cd9-a2bda4f0a606"
        ],
        "publisher": "Glénat Comics",
        "publishing_year": 2016
    },
    {
        "id": "2e7c3a72-b7fc-5260-a119-e8a94af085e5",
        "title": "Arsène Schrauwen",
        "event_ids": "99984239-be4b-5527-ac6f-2efffaa923c7",
        "author_ids": [
            "a730029a-5fc8-5f2d-83ee-d08a20957c8c"
        ],
        "publisher": "L'Association",
        "publishing_year": 2015
    },
    {
        "id": "06ce7cf3-e238-5bb4-80c8-2000e8c536c7",
        "title": "Comtesse",
        "event_ids": "99984239-be4b-5527-ac6f-2efffaa923c7",
        "author_ids": [
            "df9128c9-cec9-53c8-8729-617042111988"
        ],
        "publisher": "Les Requins Marteaux",
        "publishing_year": 2010
    },
    {
        "id": "37e7a325-c27f-5f10-a2d6-21765d017dd8",
        "title": "Soft City",
        "event_ids": "99984239-be4b-5527-ac6f-2efffaa923c7",
        "author_ids": [
            "be1bbed6-3d2a-5949-9210-263612f09011"
        ],
        "publisher": "Editions Inculte",
        "publishing_year": 2017
    },
    {
        "id": "4bc94c79-035d-558e-85ae-c08e1baee587",
        "title": "Alors que j'essayais d'être quelqu'un de bien",
        "event_ids": "6726e0d7-3eb4-5b42-b5e8-d3bd3088b319",
        "author_ids": [
            "ce395aec-bccb-5983-acf4-6da1f7dc05d3"
        ],
        "publisher": "Çà et là",
        "publishing_year": 2017
    },
    {
        "id": "b8354485-7ce8-5d1c-a71b-bca27475f6c7",
        "title": "Les derniers jours d'un immortel",
        "event_ids": "6726e0d7-3eb4-5b42-b5e8-d3bd3088b319",
        "author_ids": [
            "8bf7cd2a-5d3c-56a2-872c-08bd03f0fc87",
            "4d8e72d3-3b12-548b-b11e-25da6ce04060"
        ],
        "publisher": "Futuropolis",
        "publishing_year": 2013
    },
    {
        "id": "5be2ee50-4405-56c2-b59f-fbdc8438e45e",
        "title": "Emma G. Wilford",
        "event_ids": "6726e0d7-3eb4-5b42-b5e8-d3bd3088b319",
        "author_ids": [
            "095fe88f-e6bc-523c-a338-d927d8a46767",
            "2a1ed255-67b2-58cd-b606-8c8dd612fa86"
        ],
        "publisher": "Soleil",
        "publishing_year": 2017
    },
    {
        "id": "68213172-a9fb-5a77-9b90-2668f465ed84",
        "title": "Black Dog",
        "event_ids": "6726e0d7-3eb4-5b42-b5e8-d3bd3088b319",
        "author_ids": [
            "a296e419-1a8d-59a9-a3cd-d3ee5ba81fc9"
        ],
        "publisher": "Glénat BD",
        "publishing_year": 2017
    },
    {
        "id": "d7561c34-87ed-5351-9dcd-cabcdda88eb9",
        "title": "Les aventures de Freddy Lombard, La comète de Carthage",
        "event_ids": "10c922a7-8e8b-50ca-ae70-0e9dad0db06b",
        "author_ids": [
            "ae96a2ee-5217-5ca6-b422-07d3393e3b41"
        ],
        "publisher": "Les Humanoïdes Associés",
        "publishing_year": 2014
    },
    {
        "id": "ef41686b-1031-581f-a454-351eef12c49b",
        "title": "Ailefroide, altitude 3 954",
        "event_ids": "10c922a7-8e8b-50ca-ae70-0e9dad0db06b",
        "author_ids": [
            "289863c6-a5cf-5a8e-ac03-c19aae5a032f"
        ],
        "publisher": "Casterman",
        "publishing_year": 2018
    },
    {
        "id": "9b7133ae-5594-5171-a72d-28be9d48ac38",
        "title": "Décris-Ravage",
        "event_ids": "10c922a7-8e8b-50ca-ae70-0e9dad0db06b",
        "author_ids": [
            "28ec0041-d45e-5c0f-855e-36d755e3a8cc",
            "8de0a770-0d52-5e17-97db-ef10383eb7e6"
        ],
        "publisher": "Atrabile",
        "publishing_year": 2016
    },
    {
        "id": "a2edcba9-4069-57fa-860a-9b0f656b7911",
        "title": "Pilules Bleues",
        "event_ids": "41d6ae0e-8b21-541d-a141-e8cc0134bbab",
        "author_ids": [
            "2f4e23e5-9feb-53ab-beae-4555370c8f0d"
        ],
        "publisher": "Atrabile",
        "publishing_year": 2001
    },
    {
        "id": "2ab19c62-8468-5b16-99a6-f5b97153b993",
        "title": "Jupiter's Legacy T1 et 2",
        "event_ids": "41d6ae0e-8b21-541d-a141-e8cc0134bbab",
        "author_ids": [
            "5867fc24-0362-5151-a5c0-a8846e846594",
            "950aea29-52b1-5b38-916e-69bd7222eed0"
        ],
        "publisher": "Panini Comics France",
        "publishing_year": 2016
    },
    {
        "id": "e0f10239-868a-5cde-b6dd-9c94fed8d7b5",
        "title": "Contes ordinaires d'une société résignée",
        "event_ids": "41d6ae0e-8b21-541d-a141-e8cc0134bbab",
        "author_ids": [
            "226380ae-66d4-55d7-bf85-5d57c33b16c8"
        ],
        "publisher": "Fluide Glacial",
        "publishing_year": 2018
    },
    {
        "id": "4752dff7-0fcb-5360-a636-374577c0b313",
        "title": "Chaque jour Dracula",
        "event_ids": "41d6ae0e-8b21-541d-a141-e8cc0134bbab",
        "author_ids": [
            "dccf230a-7e53-53fc-8c68-d313d60245f3",
            "035010a7-3a33-5cdf-b3bc-237e47b1ac05"
        ],
        "publisher": "Delcourt",
        "publishing_year": 2018
    },
    {
        "id": "0e432312-5b7e-50f8-afba-7869c1256706",
        "title": "Y le dernier homme",
        "event_ids": "2fc305c6-f0c7-5462-9a45-89241614c418",
        "author_ids": [
            "ed1a4f6d-3f61-5ebf-95d6-dffa1b57b17e",
            "04714650-136f-580a-ba12-2816571f86cf"
        ],
        "publisher": "Urban Comics",
        "publishing_year": 2012
    },
    {
        "id": "8f885326-1105-5c04-9cb9-1df0a0d79080",
        "title": "Alcoolique",
        "event_ids": "2fc305c6-f0c7-5462-9a45-89241614c418",
        "author_ids": [
            "eeab9dd3-5b67-53d1-8012-0b2cc71f0442",
            "44528b19-7eac-5aab-8e73-bbc8f7c11c8b"
        ],
        "publisher": "Monsieur Toussaint Louverture",
        "publishing_year": 2015
    },
    {
        "id": "3d3f33fa-274c-5750-bbe8-b8a37f599031",
        "title": "Bouche du diable",
        "event_ids": "2fc305c6-f0c7-5462-9a45-89241614c418",
        "author_ids": [
            "1b65525f-ca97-5987-ac69-2799896f5fbf",
            "012cf8c2-f922-5759-a7c4-244fe42ff33d"
        ],
        "publisher": "Casterman",
        "publishing_year": 1990
    },
    {
        "id": "967b3863-f429-58b5-804c-12a7b22632fd",
        "title": "Mémoires d’un frêne",
        "event_ids": "2fc305c6-f0c7-5462-9a45-89241614c418",
        "author_ids": [
            "e0661633-2b9b-5f5f-8b1c-9dc7473c5037"
        ],
        "publisher": "Rue de l’échiquier",
        "publishing_year": 2018
    },
    {
        "id": "3d1c60ea-55ba-5ab4-a4fb-8b946c6b1c19",
        "title": "Deadly class",
        "event_ids": "07171107-88be-5a83-be43-0205a9c53237",
        "author_ids": [
            "8f8828b6-eed2-5ab6-8658-c165aa638119",
            "66b3e971-8a48-589a-bb44-75fb4755cf25"
        ],
        "publisher": "Urban Comics",
        "publishing_year": 2015
    },
    {
        "id": "7cb93591-7dde-59e6-9afd-dc565a390435",
        "title": "Moi ce que j'aime c'est les monstres",
        "event_ids": "07171107-88be-5a83-be43-0205a9c53237",
        "author_ids": [
            "a4c619ad-7880-5c8f-aeef-ac6c22630f6d"
        ],
        "publisher": "Monsieur Toussaint Louverture",
        "publishing_year": 2018
    },
    {
        "id": "d0acc909-4425-5267-a65a-41d9ca5be16b",
        "title": "Mimikaki",
        "event_ids": "07171107-88be-5a83-be43-0205a9c53237",
        "author_ids": [
            "f405fdc1-4877-50a2-b054-8198ebc80a55"
        ],
        "publisher": "Le Lézard Noir",
        "publishing_year": 2018
    },
    {
        "id": "c5f4a66e-a9f9-530f-8694-d73e0c2f8e4c",
        "title": "Beverly",
        "event_ids": "07171107-88be-5a83-be43-0205a9c53237",
        "author_ids": [
            "ef2a5874-3ec2-5b7d-b363-c8c94498ec1a"
        ],
        "publisher": "Presque Lune",
        "publishing_year": 2017
    },
    {
        "id": "395b6a6b-7acb-5a84-8ddf-e855409977b8",
        "title": "Seconds",
        "event_ids": "437bf521-fecc-5100-9170-e59fe3b5a117",
        "author_ids": [
            "1dd69284-50bc-5d0f-bc2c-f05b6d15d4b3"
        ],
        "publisher": "Dargaud",
        "publishing_year": 2014
    },
    {
        "id": "0fe6b6ee-7baa-56dc-ab21-40f63a87421b",
        "title": "L'ère des cristaux",
        "event_ids": "437bf521-fecc-5100-9170-e59fe3b5a117",
        "author_ids": [
            "9e03747d-9a8a-5a37-bef0-6c60c93c5600"
        ],
        "publisher": "Glénat Manga",
        "publishing_year": 2016
    },
    {
        "id": "27aa754b-ec29-5d31-aac3-143f9055fdb5",
        "title": "Boris l'enfant patate",
        "event_ids": "437bf521-fecc-5100-9170-e59fe3b5a117",
        "author_ids": [
            "c53c562f-90cf-52c7-852e-ba4fa5778897"
        ],
        "publisher": "Misma",
        "publishing_year": 2018
    },
    {
        "id": "21bdadd2-bb70-57c4-9fac-bb1eef30acc0",
        "title": "Le Grand mort",
        "event_ids": "437bf521-fecc-5100-9170-e59fe3b5a117",
        "author_ids": [
            "a353a8e9-4956-50a4-b70d-e0b753fcf522",
            "f7afb30f-e1e2-556c-9c9a-43825f33af8f",
            "7118c1e0-6a54-5867-b9b0-151ba357e1c8"
        ],
        "publisher": "Vents d'Ouest",
        "publishing_year": 2007
    },
    {
        "id": "a487bacd-3e60-5db3-9c0f-e8167d21ca9d",
        "title": "Les filles de Salem",
        "event_ids": "19afc03b-0b2f-5102-946c-c27a7158332e",
        "author_ids": [
            "34342b16-3119-579b-9c61-ef99940a8224"
        ],
        "publisher": "Dargaud",
        "publishing_year": 2018
    },
    {
        "id": "7a876a7a-5b64-5cde-9870-ecb1aa6d034c",
        "title": "Jojo bizarre adventure - Diamond is unbreakable",
        "event_ids": "19afc03b-0b2f-5102-946c-c27a7158332e",
        "author_ids": [
            "03cdc5ac-b075-5ab7-9fc8-3d64cdf0096d"
        ],
        "publisher": "Delcourt/Tonkam",
        "publishing_year": 2015
    },
    {
        "id": "6a5e1b8a-0898-5cbd-b53c-ffcb5fb7bb59",
        "title": "Dernier test avant l'apocalypse",
        "event_ids": "19afc03b-0b2f-5102-946c-c27a7158332e",
        "author_ids": [
            "a3c116a8-7515-5b5a-808f-6912b470b716"
        ],
        "publisher": "Delcourt/Tonkam",
        "publishing_year": 2013
    },
    {
        "id": "8347cdbe-e853-583d-a6f8-3288b8bb55a5",
        "title": "La mère et la mort",
        "event_ids": "19afc03b-0b2f-5102-946c-c27a7158332e",
        "author_ids": [
            "84220ea6-51be-54b2-8524-36bc6a1ad7c5"
        ],
        "publisher": "Le Tripode",
        "publishing_year": 2018
    },
    {
        "id": "c77e8572-a4d7-5a3e-b772-31dd942e9d39",
        "title": "Journal d’un ingénu et L’espoir malgré tout",
        "event_ids": "75bd8d09-d669-50a0-a00c-48987b2b9472",
        "author_ids": [
            "2d4623d8-e667-5373-b0e8-0933cc33d64e"
        ],
        "publisher": "Dupuis",
        "publishing_year": 2018
    },
    {
        "id": "4bb23804-0bcf-59c4-b051-ebf483efde5f",
        "title": "Gideon falls",
        "event_ids": "75bd8d09-d669-50a0-a00c-48987b2b9472",
        "author_ids": [
            "3b0d46d4-d6dc-5829-b7bf-e74755ca1ff0",
            "b4be3d64-8025-58ce-8c65-532412a7a00a"
        ],
        "publisher": "Urban Comics",
        "publishing_year": 2018
    },
    {
        "id": "7e408fbd-928f-56ab-b646-d972f5e24698",
        "title": "Horreur cosmique",
        "event_ids": "75bd8d09-d669-50a0-a00c-48987b2b9472",
        "author_ids": [
            "cc2cbfb1-a137-5c56-8a23-2671597ab919",
            "0e19ff22-af4d-56a0-abcc-86cb2a09490d"
        ],
        "publisher": "Rackham",
        "publishing_year": 2015
    },
    {
        "id": "21801dc4-dd74-5bc0-881d-89f0328bcfcf",
        "title": "L’art de la vulve une obscénité ?",
        "event_ids": "75bd8d09-d669-50a0-a00c-48987b2b9472",
        "author_ids": [
            "1c483a7c-e6bb-582a-8792-0cc4e649f4d0"
        ],
        "publisher": "Presque Lune",
        "publishing_year": 2018
    },
    {
        "id": "b4e6e54b-c87a-5158-b824-bba62706d262",
        "title": "Eclat(s) d’âme",
        "event_ids": "61341a8b-4c8c-56b4-856b-8ddfa3fd4ba2",
        "author_ids": [
            "458151c8-dc97-5fef-8d61-bef98aaace70"
        ],
        "publisher": "Akata",
        "publishing_year": 2018
    },
    {
        "id": "344c953c-2f98-510e-9642-b193cc079eeb",
        "title": "Sweet Thoot",
        "event_ids": "61341a8b-4c8c-56b4-856b-8ddfa3fd4ba2",
        "author_ids": [
            "3b0d46d4-d6dc-5829-b7bf-e74755ca1ff0"
        ],
        "publisher": "Urban Comics",
        "publishing_year": 2015
    },
    {
        "id": "b543747f-1269-5f2c-98d3-13188b27d9b0",
        "title": "Héroïque fantaisie",
        "event_ids": "61341a8b-4c8c-56b4-856b-8ddfa3fd4ba2",
        "author_ids": [
            "28cc0b40-521b-52be-b4d4-a956755eb971"
        ],
        "publisher": "Les Requins Marteaux",
        "publishing_year": 2018
    },
    {
        "id": "795ed7d3-240b-5db3-8a23-41fe5531f853",
        "title": "Belleville story",
        "event_ids": "61341a8b-4c8c-56b4-856b-8ddfa3fd4ba2",
        "author_ids": [
            "27924509-cf04-5879-b755-b018b8bb79a4",
            "fd980b15-243b-5a7e-98a4-46024c3809b9"
        ],
        "publisher": "Dargaud",
        "publishing_year": 2013
    },
    {
        "id": "0a1fa77f-b0ff-55a3-ba65-d274ab0605d3",
        "title": "La terre des fils",
        "event_ids": "ceff02b3-7019-5ae7-8968-0907eff83fdb",
        "author_ids": [
            "1afe6f24-4e41-56d1-a10e-f3bd77b1e3f5"
        ],
        "publisher": "Futuropolis",
        "publishing_year": 2017
    },
    {
        "id": "91796292-f679-5dc3-8e16-f53e3cd37480",
        "title": "Comme un frisson",
        "event_ids": "ceff02b3-7019-5ae7-8968-0907eff83fdb",
        "author_ids": [
            "0334ed05-27b2-5dea-b180-3ab2692d85e7"
        ],
        "publisher": "Vide Cocagne",
        "publishing_year": 2018
    },
    {
        "id": "5c0d585f-9e55-51fb-bb16-f98389cb7ce4",
        "title": "Patience",
        "event_ids": "ceff02b3-7019-5ae7-8968-0907eff83fdb",
        "author_ids": [
            "64bcc6da-c0b5-540c-a6a6-eaeb6731bbf8"
        ],
        "publisher": "Cornélius",
        "publishing_year": 2016
    },
    {
        "id": "08e65064-e95c-5215-8c3d-adb674683828",
        "title": "Les nuits d'aksehir",
        "event_ids": "ceff02b3-7019-5ae7-8968-0907eff83fdb",
        "author_ids": [
            "37d869e4-02d9-5885-a0c5-62e7f626e80d"
        ],
        "publisher": "Akata",
        "publishing_year": 2017
    },
    {
        "id": "3d70b2d5-2977-5edc-972d-5f5e66124eef",
        "title": "La balade nationale",
        "event_ids": "7373210e-8d7c-5ea1-a2de-8f97310f21f9",
        "author_ids": [
            "11ccdb5b-b14e-5297-93a6-144b65c6a374",
            "0fa6efdf-5b59-5497-a4a0-2412cc8f2249"
        ],
        "publisher": "La Découverte",
        "publishing_year": 2017
    },
    {
        "id": "bf4fe76d-85e6-5b2b-8093-bd397f29ccc2",
        "title": "Beastars",
        "event_ids": "7373210e-8d7c-5ea1-a2de-8f97310f21f9",
        "author_ids": [
            "5becded1-8df8-5719-8df7-76a7c8641ec1"
        ],
        "publisher": "Ki-oon",
        "publishing_year": 2019
    },
    {
        "id": "8ac3624a-93f8-5771-975b-942423b399b5",
        "title": "Dans un rayon de soleil",
        "event_ids": "7373210e-8d7c-5ea1-a2de-8f97310f21f9",
        "author_ids": [
            "5210ee98-eddf-5485-bec1-870d0de8270b"
        ],
        "publisher": "Gallimard BD",
        "publishing_year": 2019
    },
    {
        "id": "45654738-801a-54ec-a4da-363363691092",
        "title": "Macadam Byzance",
        "event_ids": "7373210e-8d7c-5ea1-a2de-8f97310f21f9",
        "author_ids": [
            "5e40aaad-a8ad-59d4-8f7c-0fc6c135a0cd",
            "e60fbf0f-6d78-5335-af27-7dca3f46b9b0"
        ],
        "publisher": "Fluide Glacial",
        "publishing_year": 2019
    },
    {
        "id": "6a77cc15-294a-5114-8d5f-73d5d402ab51",
        "title": "Le dernier Atlas",
        "event_ids": "e3653545-0c2a-50bd-8d14-699d252b53a9",
        "author_ids": [
            "8bf7cd2a-5d3c-56a2-872c-08bd03f0fc87",
            "4d8e72d3-3b12-548b-b11e-25da6ce04060"
        ],
        "publisher": "Dupuis",
        "publishing_year": null
    },
    {
        "id": "20804294-4e09-50cd-94bd-8372e5d99a58",
        "title": "Extases",
        "event_ids": "e3653545-0c2a-50bd-8d14-699d252b53a9",
        "author_ids": [
            "dfb60faa-598f-5699-8b2f-01a78e66cd35"
        ],
        "publisher": "Casterman BD",
        "publishing_year": null
    },
    {
        "id": "85b4afe0-39bc-53e9-b894-84624222cc7d",
        "title": "Extremity",
        "event_ids": "e3653545-0c2a-50bd-8d14-699d252b53a9",
        "author_ids": [
            "53e5ed3c-b20d-5b8d-b590-3e185b8a81c5"
        ],
        "publisher": "Delcourt Comics",
        "publishing_year": null
    },
    {
        "id": "9a9a15ba-5c4a-5d05-9b95-0f346d811cf6",
        "title": "MW",
        "event_ids": "e3653545-0c2a-50bd-8d14-699d252b53a9",
        "author_ids": [
            "91077797-d951-5025-a095-fef1a2b3bb5f"
        ],
        "publisher": "Delcourt/Tonkam",
        "publishing_year": null
    },
    {
        "id": "a9faa5b6-9672-510a-bd92-634e3aeb2240",
        "title": "My home hero",
        "event_ids": "611db4de-5ee6-5c83-83c5-af36e6222068",
        "author_ids": [
            "2e7138da-8cc1-50d9-846f-ea5c74a98cf7",
            "4c6305bb-724f-5f86-ae00-73e45454b903"
        ],
        "publisher": "Kurokawa",
        "publishing_year": null
    },
    {
        "id": "4d775666-080c-5f46-ab43-983746584a96",
        "title": "Planètes",
        "event_ids": "611db4de-5ee6-5c83-83c5-af36e6222068",
        "author_ids": [
            "183f199f-a026-5761-9ec8-c69c66040044"
        ],
        "publisher": "Panini Collections",
        "publishing_year": null
    },
    {
        "id": "99f378b2-5ec4-5e8c-9e8d-eec995fc7e71",
        "title": "In these words",
        "event_ids": "611db4de-5ee6-5c83-83c5-af36e6222068",
        "author_ids": [
            "05eb8f95-5ac9-5a9c-8111-7901bcf3d397",
            "019a8caf-92e3-54b4-8add-539931bc8478"
        ],
        "publisher": "Manga Taifu",
        "publishing_year": null
    },
    {
        "id": "6719474d-ed51-5f92-8278-3646bb92c03b",
        "title": "Bride stories",
        "event_ids": "611db4de-5ee6-5c83-83c5-af36e6222068",
        "author_ids": [],
        "publisher": "Ki-oon",
        "publishing_year": null
    },
    {
        "id": "e4e1d8bd-5c94-57eb-9b76-45b0d2e3c1b7",
        "title": "NESKA",
        "event_ids": "35935fa2-a008-5d4a-837d-ff51e42f0123",
        "author_ids": [
            "6b955294-0c6d-5b47-8a7f-7a46611b7aa4"
        ],
        "publisher": "Delcourt",
        "publishing_year": null
    },
    {
        "id": "0a23fbe5-b7b7-547f-95ef-c8e4c169ba84",
        "title": "TED DRÔLE DE COCO",
        "event_ids": "35935fa2-a008-5d4a-837d-ff51e42f0123",
        "author_ids": [
            "d055575f-870c-5ed6-8371-8ede4af900c1"
        ],
        "publisher": "Atrabile",
        "publishing_year": null
    },
    {
        "id": "8b193f6b-8fc9-5dd4-8f86-3dffe109ace2",
        "title": "BEZIMENA",
        "event_ids": "35935fa2-a008-5d4a-837d-ff51e42f0123",
        "author_ids": [
            "77897035-979e-5c77-9015-a3d636adb490"
        ],
        "publisher": "Ici Même",
        "publishing_year": null
    },
    {
        "id": "0eb55165-0714-592e-b967-ca0d76ba06ff",
        "title": "SHERIFF OF BABYLON",
        "event_ids": "35935fa2-a008-5d4a-837d-ff51e42f0123",
        "author_ids": [
            "67021253-b3f9-5131-a5a1-6f1e6996c8bd",
            "cd86941a-d2f6-535f-bb9b-ae9e1a277c61"
        ],
        "publisher": "Urban Comics",
        "publishing_year": null
    },
    {
        "id": "455fed83-1d56-56f4-b2e3-46efbcc1f0e1",
        "title": "Maléfiques",
        "event_ids": "15afad0f-6a49-5a5d-9361-e696250a3993",
        "author_ids": [
            "e5020b23-1913-5091-8e95-fb8deb0a3b96"
        ],
        "publisher": "L'Association",
        "publishing_year": null
    },
    {
        "id": "ea9613e4-c0a1-5a88-b2a4-fc986c9f2240",
        "title": "Gokinjo",
        "event_ids": "15afad0f-6a49-5a5d-9361-e696250a3993",
        "author_ids": [
            "6dc1449e-5778-5046-ae1c-0025d5d15b13"
        ],
        "publisher": "Delcourt",
        "publishing_year": null
    },
    {
        "id": "935c5f25-3edb-5853-91ea-c0c75d211ba5",
        "title": "Le trône d’argile",
        "event_ids": "15afad0f-6a49-5a5d-9361-e696250a3993",
        "author_ids": [
            "63afd855-4f1d-51bb-a5c5-faf4676934bd",
            "731fd7b0-dd35-5c0e-a77b-6d21464732f8",
            "7dc8b037-9a91-58d1-8b32-74b2c39834f2",
            "4f07590b-71c7-574a-a119-11a46258f06a"
        ],
        "publisher": "Delcourt",
        "publishing_year": null
    },
    {
        "id": "99f43ae7-65c3-5f0b-bd9a-336ad6735fea",
        "title": "Jean Doux et le mystère de la disquette molle",
        "event_ids": "15afad0f-6a49-5a5d-9361-e696250a3993",
        "author_ids": [
            "089c60ee-cedc-54f3-9c4d-9414af218b1b"
        ],
        "publisher": "Delcourt",
        "publishing_year": null
    },
    {
        "id": "3d6f3134-2abf-5826-9462-12df423eeb00",
        "title": "Passions",
        "event_ids": "943ef86c-2f3d-5418-811c-3984ec44218e",
        "author_ids": [
            "2149320d-2c93-5c48-92dd-fd4a4b4a2916"
        ],
        "publisher": "Fluide Glacial",
        "publishing_year": null
    },
    {
        "id": "90a07961-765f-588b-a9b1-147327ff19e6",
        "title": "Saison des Roses",
        "event_ids": "943ef86c-2f3d-5418-811c-3984ec44218e",
        "author_ids": [
            "92d63259-a236-5255-8a90-bf9776649674"
        ],
        "publisher": "FLBLB",
        "publishing_year": null
    },
    {
        "id": "b6e3995c-deef-5246-a9b0-df3a38e0f7e8",
        "title": "Mister Miracle",
        "event_ids": "943ef86c-2f3d-5418-811c-3984ec44218e",
        "author_ids": [
            "67021253-b3f9-5131-a5a1-6f1e6996c8bd",
            "cd86941a-d2f6-535f-bb9b-ae9e1a277c61"
        ],
        "publisher": "Urban Comics",
        "publishing_year": null
    },
    {
        "id": "fa63dd8d-c49f-5a56-9f07-8f6fbbb45dbc",
        "title": "Opus",
        "event_ids": "943ef86c-2f3d-5418-811c-3984ec44218e",
        "author_ids": [
            "2d4e035b-babd-5524-8a3e-9bcba6e75ec5"
        ],
        "publisher": "IMHO",
        "publishing_year": null
    },
    {
        "id": "91f06cb8-a704-5705-b48a-2015fa0dd6b8",
        "title": "The Unwritten",
        "event_ids": "d7b3cb60-82d7-5ed6-9e24-5df38660b7e2",
        "author_ids": [
            "ac8ec002-305d-51dd-96b9-2c2c6d35b9ab",
            "4622e2be-836f-5c71-a681-8a7b8692853d"
        ],
        "publisher": "Urban Comics",
        "publishing_year": null
    },
    {
        "id": "9c1164e3-301e-5075-af2f-013c819bb56a",
        "title": "Magic order",
        "event_ids": "d7b3cb60-82d7-5ed6-9e24-5df38660b7e2",
        "author_ids": [
            "5867fc24-0362-5151-a5c0-a8846e846594",
            "a35e9edb-f6b1-5319-a1b2-1d16cc509e2a"
        ],
        "publisher": "Panini Comics France",
        "publishing_year": null
    },
    {
        "id": "da0ebc32-b9ab-5dbd-a2ef-1ef33fd0c3ea",
        "title": "Black panther ennemi d'état",
        "event_ids": "d7b3cb60-82d7-5ed6-9e24-5df38660b7e2",
        "author_ids": [
            "40790dc7-7194-5449-98fe-ccc3f6fa7767",
            "2e83f03b-61b3-5559-8c7b-9f91ce6434b7"
        ],
        "publisher": "Panini Comics France",
        "publishing_year": null
    },
    {
        "id": "809c07eb-4cdb-564d-801f-810e13afae93",
        "title": "Luke Cage",
        "event_ids": "d7b3cb60-82d7-5ed6-9e24-5df38660b7e2",
        "author_ids": [
            "86408786-4e90-52b4-aa67-30066872af26",
            "fe17f662-7b96-54eb-a378-d165448e83c6"
        ],
        "publisher": "Panini Comics France",
        "publishing_year": null
    },
    {
        "id": "04614ebb-df6b-5425-9f49-a953190b114f",
        "title": "Préférence système",
        "event_ids": "123794f1-5856-5238-9fb5-380ed5d2e2f0",
        "author_ids": [
            "10666593-e9d3-5312-90c8-4ef8d1e3cebe"
        ],
        "publisher": "Denoël Graphic",
        "publishing_year": null
    },
    {
        "id": "fff5e173-faf5-5091-b143-91036a35047d",
        "title": "In Waves",
        "event_ids": "123794f1-5856-5238-9fb5-380ed5d2e2f0",
        "author_ids": [
            "b9adbafa-9486-52d4-bfd9-7072efd368ae"
        ],
        "publisher": "Casterman",
        "publishing_year": null
    },
    {
        "id": "88083fb1-f033-50a2-a26a-84921246605c",
        "title": "Bergères guerrières",
        "event_ids": "123794f1-5856-5238-9fb5-380ed5d2e2f0",
        "author_ids": [
            "1a7ad751-eef5-54c6-af64-bf354fc1c6bb",
            "8ebd502e-0353-5076-9daf-ef5e18c72f6c"
        ],
        "publisher": "Glenat",
        "publishing_year": null
    },
    {
        "id": "41a293e2-8d3d-5933-9188-f01edc26eb0c",
        "title": "Bakemonogatari",
        "event_ids": "123794f1-5856-5238-9fb5-380ed5d2e2f0",
        "author_ids": [],
        "publisher": "Pika",
        "publishing_year": null
    },
    {
        "id": "d535ad5b-baf2-54af-b3d5-17d8b52332ff",
        "title": "Saison des roses",
        "event_ids": "f900f0b1-9572-5d14-82cc-81f65d0543b6",
        "author_ids": [
            "92d63259-a236-5255-8a90-bf9776649674"
        ],
        "publisher": "FLBLB",
        "publishing_year": null
    },
    {
        "id": "dcc25ccb-bc58-5f18-9a49-a54fc52fdcf3",
        "title": "Nako",
        "event_ids": "f900f0b1-9572-5d14-82cc-81f65d0543b6",
        "author_ids": [
            "d16f0632-6f42-5729-a856-4a25f9e5396d"
        ],
        "publisher": "Michel Lafon",
        "publishing_year": null
    },
    {
        "id": "4e54d086-2092-5623-81ce-cdb52ee354a3",
        "title": "Raowl",
        "event_ids": "f900f0b1-9572-5d14-82cc-81f65d0543b6",
        "author_ids": [
            "0d6d184b-a29e-53a7-8833-1d8d959e8b67"
        ],
        "publisher": "dupuis",
        "publishing_year": null
    },
    {
        "id": "33368bc9-256a-520a-88cc-b78bd19c6dce",
        "title": "Peau de mille bêtes",
        "event_ids": "f900f0b1-9572-5d14-82cc-81f65d0543b6",
        "author_ids": [
            "35a4d2db-5e22-555d-bdcc-c806c0ae5f35"
        ],
        "publisher": "Delcourt",
        "publishing_year": null
    },
    {
        "id": "1346fd40-465d-50a8-9dbf-1b3db2f2f962",
        "title": "23 prostituées",
        "event_ids": "282002d3-3314-58cb-a08c-56d1b660f8ed",
        "author_ids": [
            "cdc82420-f432-5f59-a469-f2e496e2ec4d"
        ],
        "publisher": "Cornelius",
        "publishing_year": null
    },
    {
        "id": "9ea2ba3b-2b4e-5225-9479-85a8b1c8761a",
        "title": "La virginité passée 30 an",
        "event_ids": "282002d3-3314-58cb-a08c-56d1b660f8ed",
        "author_ids": [
            "9ce7b8ea-d8e8-5148-be02-bd7675f97a2e",
            "101177af-518d-573a-9f37-7d1907f8557a",
            "f95bf41f-d4da-5636-8d31-4a16f45f86ae"
        ],
        "publisher": "Akata",
        "publishing_year": null
    },
    {
        "id": "5664c22b-88d2-5a47-bf61-fb3e4f657a0b",
        "title": "Déesse",
        "event_ids": "282002d3-3314-58cb-a08c-56d1b660f8ed",
        "author_ids": [
            "df9128c9-cec9-53c8-8729-617042111988"
        ],
        "publisher": "Les Requins Marteaux",
        "publishing_year": null
    },
    {
        "id": "56fc148f-32d4-5cb2-a0e4-8eee0f478cfb",
        "title": "Otto ou l'île miroir",
        "event_ids": "282002d3-3314-58cb-a08c-56d1b660f8ed",
        "author_ids": [
            "79173c52-b077-58b7-9de5-213f60a8f298"
        ],
        "publisher": "2024",
        "publishing_year": null
    },
    {
        "id": "5cf79362-fbc8-5768-a71e-da1f3da4979b",
        "title": "LEVANTS",
        "event_ids": "1b7d31e9-f721-586b-a7b0-535c61a4ede7",
        "author_ids": [
            "21e8c9b3-1fc6-5b3f-9c64-fbc955194792"
        ],
        "publisher": "Atrabile",
        "publishing_year": null
    },
    {
        "id": "99cf5bac-a6b4-5fa0-ace7-3b6acdda880b",
        "title": "QUENOTTE et Le Monde fantastique",
        "event_ids": "1b7d31e9-f721-586b-a7b0-535c61a4ede7",
        "author_ids": [
            "ec7b8039-9647-53bd-98df-c4980ff84587"
        ],
        "publisher": "Casterman",
        "publishing_year": null
    },
    {
        "id": "6486c644-9f52-5b81-8121-a07c9ca820d3",
        "title": "SNOTGIRL",
        "event_ids": "1b7d31e9-f721-586b-a7b0-535c61a4ede7",
        "author_ids": [
            "1dd69284-50bc-5d0f-bc2c-f05b6d15d4b3",
            "cd9ac32b-5e63-5ee4-a040-0a08d8da008c"
        ],
        "publisher": "Glénat",
        "publishing_year": null
    },
    {
        "id": "a07deabb-ba5c-5b23-bd86-e977a8865e6c",
        "title": "ULTRALAZER",
        "event_ids": "1b7d31e9-f721-586b-a7b0-535c61a4ede7",
        "author_ids": [
            "5bd9bdce-2827-5048-84b1-476815daaeff",
            "96ee5e02-42ba-5540-b8a7-b2b639a577bb",
            "aaff7554-0102-5996-beae-0993b356a202"
        ],
        "publisher": "Delcourt",
        "publishing_year": null
    },
    {
        "id": "3852be01-9880-52eb-8493-9b3a5758e58f",
        "title": "Senso",
        "event_ids": "8fbf38d9-87d9-54df-ad0f-ce0e935813e4",
        "author_ids": [
            "95d147eb-c140-5339-ad8e-0d09bd1bb49f"
        ],
        "publisher": "Delcourt",
        "publishing_year": null
    },
    {
        "id": "7769da5e-26ce-5da9-bec0-7a649cbadc21",
        "title": "Kindom Come",
        "event_ids": "8fbf38d9-87d9-54df-ad0f-ce0e935813e4",
        "author_ids": [
            "643adc5f-050b-514f-855f-2ff87a990c08",
            "cf7a99fa-a50c-569b-b9bd-f5e5c1769357"
        ],
        "publisher": "Urban Comics",
        "publishing_year": null
    },
    {
        "id": "e897052f-d4f2-5e42-9731-c4f7b672d891",
        "title": "Dr. Stone",
        "event_ids": "8fbf38d9-87d9-54df-ad0f-ce0e935813e4",
        "author_ids": [
            "c3a1940c-7540-5034-8b6c-ca60b59520b3",
            "68134aa4-2f64-5303-a042-788e170ddea9"
        ],
        "publisher": "Glénat",
        "publishing_year": null
    },
    {
        "id": "a5c2edd4-0e57-5aff-ad51-1da715ae3f5e",
        "title": "Comment le roi a perdu la tête",
        "event_ids": "8fbf38d9-87d9-54df-ad0f-ce0e935813e4",
        "author_ids": [
            "a367fe72-04a8-59a8-955b-882054715ed1"
        ],
        "publisher": "çà et là",
        "publishing_year": null
    },
    {
        "id": "126597e8-c9b9-59ea-bd95-81b0e7b61342",
        "title": "Toujours tout foutre en l'air",
        "event_ids": "cc962b47-ac4d-5add-8aeb-39e10f0374e6",
        "author_ids": [
            "7dcf6112-1145-5af4-82fb-e9b92015aa1d"
        ],
        "publisher": "Revival",
        "publishing_year": null
    },
    {
        "id": "f85336b5-f4df-5112-a405-cf0dbd14fd50",
        "title": "Commissaire Kouamé",
        "event_ids": "cc962b47-ac4d-5add-8aeb-39e10f0374e6",
        "author_ids": [
            "ecb145e1-13b8-59fa-8422-1fbb2a505946",
            "aadfc208-0268-5ff7-b840-57b854a09cce"
        ],
        "publisher": "Gallimard BD",
        "publishing_year": null
    },
    {
        "id": "531a885c-829a-59e3-9ce8-4af27ee228e2",
        "title": "Nimona",
        "event_ids": "cc962b47-ac4d-5add-8aeb-39e10f0374e6",
        "author_ids": [
            "beb683f9-838a-5ab5-915e-50e5ee57e66f"
        ],
        "publisher": "Dargaud",
        "publishing_year": null
    },
    {
        "id": "ef0b7e38-3627-5f6e-b460-3e92a56d3a13",
        "title": "Pretty Deadly",
        "event_ids": "cc962b47-ac4d-5add-8aeb-39e10f0374e6",
        "author_ids": [
            "a6b81f1d-dc27-5aa3-877e-d3e6bd44907d",
            "e00c6e9a-cecb-5393-9a29-204cb3947ce9"
        ],
        "publisher": "Glénat BD",
        "publishing_year": null
    },
    {
        "id": "f82923f6-8cff-5419-927a-c3db18e9992f",
        "title": "Carbone & Silicium",
        "event_ids": "709fba55-6a76-5210-83d2-4b1f0c2dd39d",
        "author_ids": [
            "1cc29f88-7e7f-56ef-b1db-5e3a60803a8b"
        ],
        "publisher": "Ankama",
        "publishing_year": null
    },
    {
        "id": "12865e73-340e-5385-a1c0-8dcd99f6ad82",
        "title": "Capacity",
        "event_ids": "709fba55-6a76-5210-83d2-4b1f0c2dd39d",
        "author_ids": [
            "e02ab7f1-a215-5b6d-a012-ed8916473101"
        ],
        "publisher": "Ici Même",
        "publishing_year": null
    },
    {
        "id": "58bf1586-0770-5e05-9d5e-84b033947d1f",
        "title": "Les Ombres",
        "event_ids": "709fba55-6a76-5210-83d2-4b1f0c2dd39d",
        "author_ids": [
            "635f02aa-96a4-5530-bbea-013c415c8290",
            "09a3b727-757e-5f3a-84f0-75b4364f9c63"
        ],
        "publisher": "Dargaud",
        "publishing_year": null
    },
    {
        "id": "9f71560e-9697-518d-a092-a2e73ca2c608",
        "title": "Le cycle de Cyann",
        "event_ids": "709fba55-6a76-5210-83d2-4b1f0c2dd39d",
        "author_ids": [
            "a98cd576-0496-5016-8738-c111b1250f68",
            "85773f9c-27a8-5d21-9786-fad52ff3180e"
        ],
        "publisher": "Casterman",
        "publishing_year": null
    },
    {
        "id": "e36d75cf-f479-5e9b-b009-eecbf2f6e86d",
        "title": "Le Tigre des neiges",
        "event_ids": "e0863d9e-e93d-525a-9dbb-89140edf2588",
        "author_ids": [],
        "publisher": null,
        "publishing_year": null
    },
    {
        "id": "d0b3e70f-1430-5736-8b87-84b725afaebe",
        "title": "Runaways",
        "event_ids": "e0863d9e-e93d-525a-9dbb-89140edf2588",
        "author_ids": [],
        "publisher": null,
        "publishing_year": null
    },
    {
        "id": "e2e2f078-9136-5fed-a6e2-ddc3cde39297",
        "title": "Citéville",
        "event_ids": "e0863d9e-e93d-525a-9dbb-89140edf2588",
        "author_ids": [],
        "publisher": null,
        "publishing_year": null
    },
    {
        "id": "16564728-90ed-5edc-8eae-08a5f7785cff",
        "title": "Peau d'homme",
        "event_ids": "e0863d9e-e93d-525a-9dbb-89140edf2588",
        "author_ids": [],
        "publisher": null,
        "publishing_year": null
    },
    {
        "id": "7655deef-be68-561d-a942-3a401c24343e",
        "title": "Snapdragon",
        "event_ids": "f4307f94-c546-5685-b0d8-adc74d04b6cc",
        "author_ids": [
            "4a7a4f1c-41b7-5fc8-920d-ac55b12d15d1"
        ],
        "publisher": "Kinaye",
        "publishing_year": null
    },
    {
        "id": "2a776a76-0486-5fa8-a693-0507a23edda8",
        "title": "Le divin scénario",
        "event_ids": "f4307f94-c546-5685-b0d8-adc74d04b6cc",
        "author_ids": [
            "f6acf67b-3605-510c-89f9-da99c5668419",
            "588613c4-6e68-5359-ada6-29b7ff634885"
        ],
        "publisher": "Actes Sud",
        "publishing_year": null
    },
    {
        "id": "e0079da4-868b-589a-8dc6-7c04973b026b",
        "title": "Kimi le vieux chien",
        "event_ids": "f4307f94-c546-5685-b0d8-adc74d04b6cc",
        "author_ids": [
            "8d7dbf62-af3b-5183-9758-a74bff3e93b2"
        ],
        "publisher": "Misma",
        "publishing_year": null
    },
    {
        "id": "2a5e1c5f-476c-5d4e-81f3-2b78cb856e41",
        "title": "Mashle",
        "event_ids": "f4307f94-c546-5685-b0d8-adc74d04b6cc",
        "author_ids": [
            "fd8a5c80-b148-5a48-a880-d38d2e74bf5a"
        ],
        "publisher": "Kazé",
        "publishing_year": null
    },
    {
        "id": "473edb56-8483-5f87-ae9a-226e5639da7c",
        "title": "Tokyo Tarareba Girls",
        "event_ids": "5d4270fe-0c68-5bf2-92e5-75ad356de8a4",
        "author_ids": [
            "a257ccd6-592f-5169-9247-729f4a009e2d"
        ],
        "publisher": "lézard Noir",
        "publishing_year": null
    },
    {
        "id": "d8f9a56b-3061-5c16-9cce-1d231de67319",
        "title": "Something is Killing the Children",
        "event_ids": "5d4270fe-0c68-5bf2-92e5-75ad356de8a4",
        "author_ids": [
            "11132b63-24cf-5e0c-87e3-f82a28ac89e8",
            "11b97ae6-9bb9-56c9-914a-c8e0fe79156c"
        ],
        "publisher": "Urban Comics",
        "publishing_year": null
    },
    {
        "id": "cd0cdc46-bfd4-5850-beaf-3019f10e3e7b",
        "title": "Tomino la maudite",
        "event_ids": "5d4270fe-0c68-5bf2-92e5-75ad356de8a4",
        "author_ids": [
            "2bd1623e-7f3d-543a-b05c-628bb3e6d6b4"
        ],
        "publisher": "Casterman",
        "publishing_year": null
    },
    {
        "id": "1a3f1d17-bebd-5ddb-abe3-9533675f24a8",
        "title": "Le Jeu des hirondelles",
        "event_ids": "5d4270fe-0c68-5bf2-92e5-75ad356de8a4",
        "author_ids": [
            "56030257-e26e-53d8-9d62-6471ba32ecce"
        ],
        "publisher": "Cambourakis",
        "publishing_year": null
    },
    {
        "id": "609fe001-1408-54fc-8686-1a7094aaa0da",
        "title": "Les contes de la crypte",
        "event_ids": "090131b6-3b33-5b91-ac22-f73f60f5d347",
        "author_ids": [
            "581a5d0a-41d0-54b0-8ccb-9f5dac37c4e3"
        ],
        "publisher": "Akileos",
        "publishing_year": 2020
    },
    {
        "id": "493aa385-71e1-5b94-937d-fc270fd2d7bc",
        "title": "L'Autoroute du Soleil",
        "event_ids": "090131b6-3b33-5b91-ac22-f73f60f5d347",
        "author_ids": [
            "23c4dbf2-da76-5959-b5c8-de2b87f8dc74"
        ],
        "publisher": "Casterman",
        "publishing_year": 2016
    },
    {
        "id": "209120cd-8ef2-5051-9030-5750844215c5",
        "title": "Flippette & Venere",
        "event_ids": "090131b6-3b33-5b91-ac22-f73f60f5d347",
        "author_ids": [
            "8c05c235-5085-5da5-975c-95a3ec03a0ce"
        ],
        "publisher": "Delcourt",
        "publishing_year": 2020
    },
    {
        "id": "00b764c7-9e57-5a44-8922-76ffc6c0c006",
        "title": "Soleil mécanique",
        "event_ids": "090131b6-3b33-5b91-ac22-f73f60f5d347",
        "author_ids": [
            "f1c41fdd-a85b-58e1-b10d-1c31f9803326"
        ],
        "publisher": "Ca et la",
        "publishing_year": 2021
    },
    {
        "id": "385f1264-4b26-5572-b2a8-10343d26cc7c",
        "title": "Megg Mogg And Owl - Maximal Spleen",
        "event_ids": "b2b823be-b192-5bd5-9047-db6dac16cd7a",
        "author_ids": [
            "06ae0839-7b89-5d3a-bf83-99dc6830803a"
        ],
        "publisher": "Misma",
        "publishing_year": 2014
    },
    {
        "id": "2f0d945f-bd63-5967-9a57-844e20b11675",
        "title": "Le privilège des Dieux",
        "event_ids": "b2b823be-b192-5bd5-9047-db6dac16cd7a",
        "author_ids": [
            "eb5d6e96-6e8e-5188-8ea6-58cc19c59957"
        ],
        "publisher": "Les requins Marteaux",
        "publishing_year": 2020
    },
    {
        "id": "045e3ca9-5744-52bb-ba4c-d69f08e9c343",
        "title": "Blanc Autour",
        "event_ids": "b2b823be-b192-5bd5-9047-db6dac16cd7a",
        "author_ids": [
            "7116930d-8c4e-548c-b9e6-248dafce1360",
            "35a4d2db-5e22-555d-bdcc-c806c0ae5f35"
        ],
        "publisher": "DARGAUD",
        "publishing_year": 2021
    },
    {
        "id": "98a1d8c6-853d-5970-b117-ace76d927b91",
        "title": "Salammbô",
        "event_ids": "b2b823be-b192-5bd5-9047-db6dac16cd7a",
        "author_ids": [
            "141dc09a-4241-51b4-a81e-5402d1647f96"
        ],
        "publisher": "Glenat",
        "publishing_year": 1991
    },
    {
        "id": "0527534f-2c66-5d92-94d5-e579f45fd919",
        "title": "Idéal Standard",
        "event_ids": "e17498f8-e03e-5e24-8a88-9c976c869054",
        "author_ids": [
            "df9128c9-cec9-53c8-8729-617042111988"
        ],
        "publisher": "Dargaud",
        "publishing_year": 2017
    },
    {
        "id": "5bebe1b3-ed45-5b99-bc12-026abccc686e",
        "title": "Les Sentiments du prince Charles",
        "event_ids": "e17498f8-e03e-5e24-8a88-9c976c869054",
        "author_ids": [
            "6036d73a-1f6b-581b-8e41-74a385c4be82"
        ],
        "publisher": "Rackham",
        "publishing_year": 2012
    },
    {
        "id": "45a36e4f-7780-53c1-b774-353b3aa6e85e",
        "title": "Kwoloon Généric Romance",
        "event_ids": "e17498f8-e03e-5e24-8a88-9c976c869054",
        "author_ids": [
            "b6ec5ccc-d0ec-5f4f-971f-7e1f961f15f1"
        ],
        "publisher": "Kana",
        "publishing_year": 2021
    },
    {
        "id": "be84548c-9e26-56ea-a97d-bdf4b9653250",
        "title": "Moins qu'hier (plus que demain)",
        "event_ids": "e17498f8-e03e-5e24-8a88-9c976c869054",
        "author_ids": [
            "831f7cc9-9ad6-5358-8ca1-1d671a6cb6f1"
        ],
        "publisher": "Glenat",
        "publishing_year": 2018
    },
    {
        "id": "04c7c967-43b9-5255-a016-a6a6713ccaf0",
        "title": "Anaïs Nin - Sur la mer des mensonges",
        "event_ids": "aabf7c0f-3e3c-53d0-8439-2987209842ce",
        "author_ids": [
            "a1b4ee86-d88a-5c9f-a04e-fb542537c0f0"
        ],
        "publisher": "Casterman",
        "publishing_year": 2020
    },
    {
        "id": "808def66-0261-5fb0-adf1-2e8c3f8761d8",
        "title": "Justice League - Crise d'identité",
        "event_ids": "aabf7c0f-3e3c-53d0-8439-2987209842ce",
        "author_ids": [
            "566e776d-c9d5-52e2-8388-6dad7d49b424",
            "b922cef3-2fc8-568f-a16c-87f17c81465e"
        ],
        "publisher": "Urban Comics",
        "publishing_year": 2013
    },
    {
        "id": "6cbc856d-bbf3-517d-8096-69dcf2e9b270",
        "title": "Les 100 nuits de Héros",
        "event_ids": "aabf7c0f-3e3c-53d0-8439-2987209842ce",
        "author_ids": [
            "d8152d45-6327-555b-bab0-5773452caeed"
        ],
        "publisher": "Casterman",
        "publishing_year": 2017
    },
    {
        "id": "122a0172-06d1-548d-a796-547d56b7fa4c",
        "title": "Malavalle",
        "event_ids": "aabf7c0f-3e3c-53d0-8439-2987209842ce",
        "author_ids": [
            "10666593-e9d3-5312-90c8-4ef8d1e3cebe",
            "3f2d648d-6795-56c7-a81a-4a98b852b1a0"
        ],
        "publisher": "Realistes",
        "publishing_year": 2021
    },
    {
        "id": "e37157f2-efbb-508a-bc47-17a90bc02c84",
        "title": "Lanfeust de Troy",
        "event_ids": "8a669087-f5d9-5ad7-8e68-ebb6a641bcc1",
        "author_ids": [
            "9d6057a1-8a84-5712-9f8c-4f2e530b2f34",
            "5b576627-0b89-5180-bd78-cb87eb672cd0"
        ],
        "publisher": "Soleil",
        "publishing_year": null
    },
    {
        "id": "ad666457-dc66-5f79-a8e2-24d71257ce29",
        "title": "I am the Eggman",
        "event_ids": "8a669087-f5d9-5ad7-8e68-ebb6a641bcc1",
        "author_ids": [
            "0f40eecd-24cf-5c5c-8330-f71cda6d02c3"
        ],
        "publisher": "L'Association",
        "publishing_year": null
    },
    {
        "id": "deb20c8e-015a-5c9c-9686-1111263e8a0a",
        "title": "Violette Morris - à abattre par tous moyens",
        "event_ids": "8a669087-f5d9-5ad7-8e68-ebb6a641bcc1",
        "author_ids": [
            "cd5b8826-38e8-5380-86f3-a2d6735d723a",
            "1f55bd80-400f-5c7c-98ed-d29a9fff6cbe",
            "030b9850-5805-5d5d-b8ef-9d9d2f42cdd6",
            "b791b4d4-8740-554d-ad07-82218d8bb7ed"
        ],
        "publisher": "Futuropolis",
        "publishing_year": null
    },
    {
        "id": "95b4b543-ca5b-5c52-a9a8-ee27b4ebe32b",
        "title": "Lock and Key",
        "event_ids": "8a669087-f5d9-5ad7-8e68-ebb6a641bcc1",
        "author_ids": [
            "604f3749-8f3e-5862-a9e5-04fa037f26c0",
            "38ca6247-1af6-574c-b8c6-2ce51282d966"
        ],
        "publisher": "Hicomics",
        "publishing_year": null
    },
    {
        "id": "2d214a1a-d718-56ca-b4b1-daecd27fbc70",
        "title": "Un visage familier",
        "event_ids": "c6c3bfe8-27bb-5f87-8f63-9c307b2adb36",
        "author_ids": [
            "befc47ec-c72f-58e3-8519-a28173853443"
        ],
        "publisher": "Atrabile",
        "publishing_year": null
    },
    {
        "id": "553ba159-d15e-5f69-a159-fc28c71edeca",
        "title": "La Princesse du château sans fin",
        "event_ids": "c6c3bfe8-27bb-5f87-8f63-9c307b2adb36",
        "author_ids": [
            "b4ba44f4-199f-5988-8479-e4422af71a49"
        ],
        "publisher": "Huber éditions",
        "publishing_year": null
    },
    {
        "id": "0e8111d0-2e90-54c7-88b1-43b0e0881cc9",
        "title": "Ecoute, jolie Marcia",
        "event_ids": "c6c3bfe8-27bb-5f87-8f63-9c307b2adb36",
        "author_ids": [
            "faf147b2-0071-53bc-bd91-a89be82a3bde"
        ],
        "publisher": "ça et là",
        "publishing_year": null
    },
    {
        "id": "ed1239f8-6705-59cc-89fa-0f58a386644e",
        "title": "Panorama",
        "event_ids": "c6c3bfe8-27bb-5f87-8f63-9c307b2adb36",
        "author_ids": [
            "c5b9e189-2937-5717-9cfa-4bf3ca95975e"
        ],
        "publisher": "Delirium",
        "publishing_year": null
    },
    {
        "id": "259a0454-9500-5b1b-be3c-1039abe5838a",
        "title": "Boys Run the Riot",
        "event_ids": "c1b58e60-3d64-5fd5-aa5d-83a476a8bab1",
        "author_ids": [
            "eae3e547-17c4-5a9d-9f08-a099870e7427"
        ],
        "publisher": "Akata",
        "publishing_year": null
    },
    {
        "id": "5b09fc60-7852-5dd7-85fd-47d06d44ac08",
        "title": "Journal 1&2",
        "event_ids": "c1b58e60-3d64-5fd5-aa5d-83a476a8bab1",
        "author_ids": [
            "1e2535bc-1306-5edf-a096-6619d1fc69f0"
        ],
        "publisher": "Delcourt",
        "publishing_year": null
    },
    {
        "id": "5792de8a-229c-5f32-9cd0-3d9421f85b62",
        "title": "La fille dans l'écran",
        "event_ids": "c1b58e60-3d64-5fd5-aa5d-83a476a8bab1",
        "author_ids": [
            "517fda5b-0d2f-5cb9-a689-38ded1fc1732",
            "f98adb03-4782-5e7d-858c-cea66c569d0a"
        ],
        "publisher": "Marabulles",
        "publishing_year": null
    },
    {
        "id": "d77af3ef-1018-580f-8b4b-bdac6993c4b9",
        "title": "La Nuit Mange le jour",
        "event_ids": "c1b58e60-3d64-5fd5-aa5d-83a476a8bab1",
        "author_ids": [
            "4102d5a8-722f-5280-a290-ccc976747c79",
            "a0ad17df-cc7c-5579-a3f6-7fea6f6b69f5"
        ],
        "publisher": "Glénat",
        "publishing_year": null
    },
    {
        "id": "081abfa6-a3db-5c8b-ac64-f2ef4e0beb4d",
        "title": "Emma CakeCup",
        "event_ids": "208965ad-c1ba-5935-ad9c-599ec120152f",
        "author_ids": [
            "002b8b8f-eaec-50aa-b1a9-dd32ff43ef58",
            "c6c2e2e5-de20-5485-a998-76541abafe3e"
        ],
        "publisher": "Jungle",
        "publishing_year": null
    },
    {
        "id": "93c55d49-da91-53a8-9384-a9e74f86fe92",
        "title": "Papa Situations",
        "event_ids": "208965ad-c1ba-5935-ad9c-599ec120152f",
        "author_ids": [
            "3ecb51cb-7330-5551-b059-2bc07bbe2220"
        ],
        "publisher": "Dupuis",
        "publishing_year": null
    },
    {
        "id": "81d0933e-90f7-5b74-b9fb-ba27cc47fa12",
        "title": "Bleak",
        "event_ids": "208965ad-c1ba-5935-ad9c-599ec120152f",
        "author_ids": [
            "9ebb375a-570f-5d10-af89-e2581554813f",
            "67a61400-02a1-5e8a-815f-efe1aaff4044"
        ],
        "publisher": "LINK DIGITAL",
        "publishing_year": 2022
    },
    {
        "id": "bb95f1ee-35e4-5172-bcf9-11aa19d39885",
        "title": "Roger et ses humains",
        "event_ids": "208965ad-c1ba-5935-ad9c-599ec120152f",
        "author_ids": [
            "740a55f0-b066-529c-aad3-be7706f65d0c",
            "728ca873-d312-575d-b216-7d2f31953628"
        ],
        "publisher": "Dupuis",
        "publishing_year": null
    },
    {
        "id": "219fdb59-446f-5ec8-ada8-aa3432778341",
        "title": "Transperceneige",
        "event_ids": "a03c92e9-d27b-5a1a-83b5-01c0a6448113",
        "author_ids": [
            "4262dd32-264e-5b27-89d4-b8f1d948b32c",
            "acaa9413-e232-5de0-95fa-e139a9ece44f",
            "5d4b528a-9838-5b47-9940-6c3506237d97"
        ],
        "publisher": "Casterman",
        "publishing_year": null
    },
    {
        "id": "7e0fbd51-70be-5b79-b9fd-fdcbdbe6784d",
        "title": "Des-agréments d'un voyage d'agrément",
        "event_ids": "a03c92e9-d27b-5a1a-83b5-01c0a6448113",
        "author_ids": [
            "1a18f2fb-0d2c-54c5-a763-fdadef46f041"
        ],
        "publisher": "2024",
        "publishing_year": null
    },
    {
        "id": "67a5f9be-05e5-5595-a37f-a5ab7ac9952b",
        "title": "Wonder Woman Dead Earth",
        "event_ids": "a03c92e9-d27b-5a1a-83b5-01c0a6448113",
        "author_ids": [
            "53e5ed3c-b20d-5b8d-b590-3e185b8a81c5"
        ],
        "publisher": "Urban",
        "publishing_year": null
    },
    {
        "id": "fbb83c90-bc31-53bb-82f1-62a4921b7b66",
        "title": "Idées Noires",
        "event_ids": "a03c92e9-d27b-5a1a-83b5-01c0a6448113",
        "author_ids": [
            "c86e250b-e9c3-59aa-869a-9ab8b53022f1"
        ],
        "publisher": "Fluide Glacial",
        "publishing_year": null
    },
    {
        "id": "2f23ec7b-6aa5-5cf5-b8ac-331ee184fe94",
        "title": "Coney Island Baby",
        "event_ids": "eeadbfa3-c51f-50a0-ab86-e2ac7810303e",
        "author_ids": [
            "e5020b23-1913-5091-8e95-fb8deb0a3b96"
        ],
        "publisher": "l’Association",
        "publishing_year": null
    },
    {
        "id": "90278e20-06f0-50f8-a8f0-04b97acfe3ce",
        "title": "la Fille de la plage",
        "event_ids": "eeadbfa3-c51f-50a0-ab86-e2ac7810303e",
        "author_ids": [
            "b4e9729a-f1c7-5994-b791-a4c365333f5b"
        ],
        "publisher": "éditions IMHO",
        "publishing_year": null
    },
    {
        "id": "aa142d80-6e53-53cf-ad01-13c8af2060cf",
        "title": "Fraise et Chocolat",
        "event_ids": "eeadbfa3-c51f-50a0-ab86-e2ac7810303e",
        "author_ids": [
            "f42b2254-0bb6-589f-b754-788623bc0690"
        ],
        "publisher": "es Impressions Nouvelles",
        "publishing_year": null
    },
    {
        "id": "22bae3a8-139b-5a3f-932f-80fc901d43af",
        "title": "L’Origine du Monstre",
        "event_ids": "eeadbfa3-c51f-50a0-ab86-e2ac7810303e",
        "author_ids": [
            "d055575f-870c-5ed6-8371-8ede4af900c1"
        ],
        "publisher": "Requins Marteaux",
        "publishing_year": null
    },
    {
        "id": "621f773d-d0aa-5e22-bf81-c530967a1fbe",
        "title": "Koma",
        "event_ids": "2c1a0bf6-fd69-5ce4-a0dc-4c49a0a5c1b4",
        "author_ids": [
            "70125cb3-0e45-5bc9-9aef-4cbb67edb051",
            "d665cfb4-c5db-586a-ad00-d7483be1868f"
        ],
        "publisher": "les Humanoïdes Associés",
        "publishing_year": null
    },
    {
        "id": "8b049e1b-5908-5c4b-972e-d34e04c6ab0c",
        "title": "Mind MGMT",
        "event_ids": "2c1a0bf6-fd69-5ce4-a0dc-4c49a0a5c1b4",
        "author_ids": [
            "088ef0e0-f6d5-5b0b-8bbe-34adf8a69a86"
        ],
        "publisher": "éditions Monsieur Toussaint Louverture",
        "publishing_year": null
    },
    {
        "id": "a88d2dfe-e823-5455-b5a7-a9eea7604db2",
        "title": "Toonzie",
        "event_ids": "2c1a0bf6-fd69-5ce4-a0dc-4c49a0a5c1b4",
        "author_ids": [
            "55a709af-cd36-5f34-9454-177b62ab1b72"
        ],
        "publisher": "2024",
        "publishing_year": null
    },
    {
        "id": "20219cc1-6639-5762-9325-1f565d5143ce",
        "title": "Fun Home",
        "event_ids": "2c1a0bf6-fd69-5ce4-a0dc-4c49a0a5c1b4",
        "author_ids": [
            "c31ac25f-8577-51a4-8112-3280350d8f34"
        ],
        "publisher": "Denoël Graphic",
        "publishing_year": null
    },
    {
        "id": "7c33cd89-18a5-55ee-a927-d33a3b91a4d4",
        "title": "Le Grand Vide",
        "event_ids": "8057115a-7249-5288-a959-7f770b0707da",
        "author_ids": [
            "6c618371-acaa-57cf-916f-31d5288f8285"
        ],
        "publisher": "2024",
        "publishing_year": null
    },
    {
        "id": "8e76ff82-caba-5256-b56f-36fdcc09b8cc",
        "title": "DanDaDan",
        "event_ids": "8057115a-7249-5288-a959-7f770b0707da",
        "author_ids": [
            "0d7a1f2e-614f-5f9b-9eb0-e977c4413fbc"
        ],
        "publisher": "Crunchyroll",
        "publishing_year": null
    },
    {
        "id": "6f40ce09-c1fc-56c3-b191-aaef5f620982",
        "title": "Comme un Chef",
        "event_ids": "8057115a-7249-5288-a959-7f770b0707da",
        "author_ids": [
            "0cc64c64-f713-57ca-a315-70087758c502",
            "f42b2254-0bb6-589f-b754-788623bc0690"
        ],
        "publisher": "Casterman",
        "publishing_year": null
    },
    {
        "id": "6285af41-5732-5e84-907f-7c1c6393c5e5",
        "title": "Le Chemisier",
        "event_ids": "8057115a-7249-5288-a959-7f770b0707da",
        "author_ids": [
            "552512e4-a3e7-5246-89cf-9ddee4ca5e17"
        ],
        "publisher": "Casterman",
        "publishing_year": null
    },
    {
        "id": "e316844c-27bd-5037-a0f8-1327a62e748f",
        "title": "Bébé Fille",
        "event_ids": "1320b429-70e2-593e-976d-0cc9646e88c8",
        "author_ids": [
            "9a3c0069-aa3f-5826-9ef1-9f344244d3dc"
        ],
        "publisher": "Même Pas Mal",
        "publishing_year": null
    },
    {
        "id": "92d5d028-df2f-5e50-b4b7-9887ae2f807b",
        "title": "Toutes les morts de Laila Starr",
        "event_ids": "1320b429-70e2-593e-976d-0cc9646e88c8",
        "author_ids": [
            "4eee69a6-88fd-5e48-b8f5-dd582920a450",
            "94b0e949-b89d-5ea5-b0b9-7cbd0ac73da4"
        ],
        "publisher": "Urban Comics",
        "publishing_year": null
    },
    {
        "id": "80e320c2-11e7-595b-89ba-24b81ea6d621",
        "title": "Phénix, L’oiseau de feu",
        "event_ids": "1320b429-70e2-593e-976d-0cc9646e88c8",
        "author_ids": [
            "91077797-d951-5025-a095-fef1a2b3bb5f"
        ],
        "publisher": "Delcourt",
        "publishing_year": null
    },
    {
        "id": "8faa03ae-f8f4-5b68-9059-c0c628f85707",
        "title": "Le Dieu Vagabond",
        "event_ids": "1320b429-70e2-593e-976d-0cc9646e88c8",
        "author_ids": [
            "588613c4-6e68-5359-ada6-29b7ff634885"
        ],
        "publisher": "Sarbacane",
        "publishing_year": null
    },
    {
        "id": "af8eb788-7a27-5205-84b1-ae1298595b7d",
        "title": "Whiskey and New York",
        "event_ids": "814b8d2c-b7ac-5509-9440-0e6532e9847a",
        "author_ids": [
            "c1ffebeb-922e-5aec-a97e-43302c30360d"
        ],
        "publisher": "l’Agrume",
        "publishing_year": null
    },
    {
        "id": "f6c7005e-7b64-5eef-844a-2ac4acdc1b07",
        "title": "Le Bestiaire du Crépuscule",
        "event_ids": "814b8d2c-b7ac-5509-9440-0e6532e9847a",
        "author_ids": [
            "48aace14-0b8f-5dc9-aee0-2b52c883a081"
        ],
        "publisher": "Dupuis",
        "publishing_year": null
    },
    {
        "id": "406eb059-e7e8-54f1-8f89-cddea6c629e0",
        "title": "Les Sauvages",
        "event_ids": "814b8d2c-b7ac-5509-9440-0e6532e9847a",
        "author_ids": [
            "6ada2d73-1f4e-5954-8c72-bc0404fa4307"
        ],
        "publisher": "Actes Sud/ L’An 2",
        "publishing_year": null
    },
    {
        "id": "f865a993-10dd-5daf-9303-db5328540034",
        "title": "La Marque Jaune",
        "event_ids": "814b8d2c-b7ac-5509-9440-0e6532e9847a",
        "author_ids": [
            "f88b6be4-be83-553a-9a10-0c3ff88d9c71"
        ],
        "publisher": "Dargaud",
        "publishing_year": null
    },
    {
        "id": "ec050548-66da-5642-af27-79ee4e0f5571",
        "title": "La dernière comédie de Paolo Pinnochio",
        "event_ids": "ec126adf-2c87-51c4-b109-22b7689339ad",
        "author_ids": [
            "ec3adb15-c596-5229-b64a-d324f9941ab6"
        ],
        "publisher": "Tanibis",
        "publishing_year": null
    },
    {
        "id": "a363d9bd-8981-5155-9eb6-c9cef10c231a",
        "title": "Madones et Putains",
        "event_ids": "ec126adf-2c87-51c4-b109-22b7689339ad",
        "author_ids": [
            "e5020b23-1913-5091-8e95-fb8deb0a3b96"
        ],
        "publisher": "Dupuis",
        "publishing_year": null
    },
    {
        "id": "01c74bc6-960a-58b3-9069-ca12ec2fb9b4",
        "title": "le Choeur des Femmes",
        "event_ids": "ec126adf-2c87-51c4-b109-22b7689339ad",
        "author_ids": [
            "901b17fe-09a8-5b9f-9f5d-a73d92a26547"
        ],
        "publisher": "Lombard",
        "publishing_year": null
    },
    {
        "id": "e00d76ed-0c5c-5fcb-b972-355c57612e91",
        "title": "La Mer à boire",
        "event_ids": "ec126adf-2c87-51c4-b109-22b7689339ad",
        "author_ids": [
            "c75bf8ef-b761-59b7-aa36-7db51b472618"
        ],
        "publisher": "2024",
        "publishing_year": null
    },
    {
        "id": "b86b53b5-7121-5fae-8ed9-50fc48076812",
        "title": "Bunker",
        "event_ids": "eede8ed7-1012-5831-95cb-b0d7c540f82c",
        "author_ids": [
            "2822bd0a-4242-59a8-a4dd-2a9d553c94f0"
        ],
        "publisher": "Dupuis",
        "publishing_year": null
    },
    {
        "id": "4926fa87-8fac-59ea-b462-beaa8865b399",
        "title": "Tokyo Alien Bros",
        "event_ids": "eede8ed7-1012-5831-95cb-b0d7c540f82c",
        "author_ids": [
            "7036c4fd-e408-5618-af2e-9baaff128651"
        ],
        "publisher": "Lézard Noir",
        "publishing_year": null
    },
    {
        "id": "b2b56cf4-189b-5c0f-b0a9-b3f4944df2f8",
        "title": "Corps Vivante",
        "event_ids": "eede8ed7-1012-5831-95cb-b0d7c540f82c",
        "author_ids": [
            "e7bad250-6da0-56ae-ab7c-bb32c2243587"
        ],
        "publisher": "Pow Pow",
        "publishing_year": null
    },
    {
        "id": "904c9d20-f81a-591d-b110-2e457f6d8f60",
        "title": "Koko n'aime pas le capitalisme",
        "event_ids": "eede8ed7-1012-5831-95cb-b0d7c540f82c",
        "author_ids": [
            "54bfd2ce-3cf6-5269-8baa-e3571399f282"
        ],
        "publisher": "bandes détournées",
        "publishing_year": null
    },
    {
        "id": "24c15eca-cdd6-52e2-ae02-ca99c6a37884",
        "title": "Scott Pilgrim",
        "event_ids": "2412bc73-7636-5bb4-84b3-059088f2b82f",
        "author_ids": [
            "1dd69284-50bc-5d0f-bc2c-f05b6d15d4b3"
        ],
        "publisher": "HiComics",
        "publishing_year": null
    },
    {
        "id": "e2d4bc7b-ec4b-5fb3-880e-e94f5c8c0eaa",
        "title": "Dark Knight, une histoire vraie",
        "event_ids": "2412bc73-7636-5bb4-84b3-059088f2b82f",
        "author_ids": [
            "3614d1a7-ee71-5831-acc7-36feb510177c",
            "8f0a123e-a29e-5620-989c-8b6e9bc9f3de"
        ],
        "publisher": "Urban Comics",
        "publishing_year": null
    },
    {
        "id": "df990528-33c4-5c15-87e0-ad4119be24f3",
        "title": "The Nice house on the lake",
        "event_ids": "2412bc73-7636-5bb4-84b3-059088f2b82f",
        "author_ids": [
            "11132b63-24cf-5e0c-87e3-f82a28ac89e8"
        ],
        "publisher": "Urban Comics",
        "publishing_year": null
    },
    {
        "id": "47a951d2-d847-566a-9180-6dad63037708",
        "title": "Motor Girl",
        "event_ids": "2412bc73-7636-5bb4-84b3-059088f2b82f",
        "author_ids": [
            "d7afa3d1-9cbc-5630-9a1e-36550ba2ae00"
        ],
        "publisher": "Delcourt",
        "publishing_year": null
    },
    {
        "id": "f2ece642-d63f-5322-8208-0d755268b0a7",
        "title": "Les ignorants",
        "event_ids": "7cfd32e5-2609-59f6-8a7c-b9a75bd93ddc",
        "author_ids": [
            "81eb6653-4aac-5e37-b82d-5e6552f5669a"
        ],
        "publisher": "Futuropolis",
        "publishing_year": 2011
    },
    {
        "id": "b94bc845-eb86-5631-9fb8-fcaf3f1b0ed5",
        "title": "La caste des metas-Barons",
        "event_ids": "7cfd32e5-2609-59f6-8a7c-b9a75bd93ddc",
        "author_ids": [
            "10a532a2-fbf4-5e12-af99-152a45092deb",
            "e98c2e27-b0f3-5c53-b4b4-6deb8dd0969b"
        ],
        "publisher": "Les humanoides associes",
        "publishing_year": 2002
    },
    {
        "id": "233df3dc-5aec-5505-b208-b7dad00c99b1",
        "title": "Berserk",
        "event_ids": "7cfd32e5-2609-59f6-8a7c-b9a75bd93ddc",
        "author_ids": [
            "5687b7c6-fc2f-5234-8443-9dccba2dbe03"
        ],
        "publisher": "Glenat",
        "publishing_year": 1997
    },
    {
        "id": "903acafa-4e30-5dcb-85ec-e2d1ce52d741",
        "title": "Pinocchio",
        "event_ids": "7cfd32e5-2609-59f6-8a7c-b9a75bd93ddc",
        "author_ids": [
            "fd5a8b65-5f73-54a0-a57e-54dfea8abc8c"
        ],
        "publisher": "Les requins Marteaux",
        "publishing_year": 2008
    },
    {
        "id": "d7d58ce0-3034-5dc1-ad26-f2ba302c0559",
        "title": "Time Paradox Ghostwriter",
        "event_ids": "90f854a6-e76e-5e9b-8868-3e30eaf40e0d",
        "author_ids": [
            "e5d3b413-fc6e-5914-a5e2-4cca6c66a3b4",
            "a613ac87-f316-5eb1-a41b-c629d3975868"
        ],
        "publisher": "Crunchyroll/Kazé",
        "publishing_year": null
    },
    {
        "id": "73418c95-df6c-50b9-8713-0cd6437ca1e8",
        "title": "Le Goût de la nectarine",
        "event_ids": "90f854a6-e76e-5e9b-8868-3e30eaf40e0d",
        "author_ids": [
            "1f638d4e-04ec-5db9-840e-ac7e034bf933"
        ],
        "publisher": "Sarbacane",
        "publishing_year": null
    },
    {
        "id": "32c39747-541d-55b3-b217-835c9e26ffdb",
        "title": "Doc Frankenstein",
        "event_ids": "90f854a6-e76e-5e9b-8868-3e30eaf40e0d",
        "author_ids": [
            "f8f3e6c7-7f1c-5fa4-95b3-e5943256b388",
            "cb340fda-dc8b-599c-9ba4-114eff1ad741"
        ],
        "publisher": "Huginn & Muninn",
        "publishing_year": null
    },
    {
        "id": "12d42d70-3a3c-5d61-bf59-ac8cc63ba0a5",
        "title": "Malgré tout",
        "event_ids": "90f854a6-e76e-5e9b-8868-3e30eaf40e0d",
        "author_ids": [
            "35cf1a17-190f-5618-a7fe-4554e75983f4"
        ],
        "publisher": "Dargaud",
        "publishing_year": null
    },
    {
        "id": "0600c708-f469-5a62-87d6-0081966be2b0",
        "title": "Le fils de l'ours père",
        "event_ids": "63b8a88a-a47e-5b0d-a5b7-0f857ab8e48e",
        "author_ids": [
            "21e8c9b3-1fc6-5b3f-9c64-fbc955194792"
        ],
        "publisher": "Hoochie Coochie",
        "publishing_year": null
    },
    {
        "id": "28c74fd2-511a-5728-a28e-8876fa62ece8",
        "title": "la fille maudite du capitaine pirate",
        "event_ids": "63b8a88a-a47e-5b0d-a5b7-0f857ab8e48e",
        "author_ids": [
            "bc5f45bb-b47a-5c9e-9452-990ca3ac5f9a"
        ],
        "publisher": "éditions de la Cerise",
        "publishing_year": null
    },
    {
        "id": "c7de24d2-2e14-55d4-9ba8-d7999551971b",
        "title": "Ils Brûlent",
        "event_ids": "63b8a88a-a47e-5b0d-a5b7-0f857ab8e48e",
        "author_ids": [
            "0334ed05-27b2-5dea-b180-3ab2692d85e7"
        ],
        "publisher": "6 pieds sous terre",
        "publishing_year": null
    },
    {
        "id": "5ce81c2c-23ca-5bfe-899a-011a2c38e9e0",
        "title": "Hoka Hey !",
        "event_ids": "63b8a88a-a47e-5b0d-a5b7-0f857ab8e48e",
        "author_ids": [
            "591a05fd-7b21-55d5-bd3a-0214e741d120"
        ],
        "publisher": "Rue de Sèvres (Label 619)",
        "publishing_year": null
    },
    {
        "id": "46840f52-8e72-51fa-8308-bfe9e584b7c8",
        "title": "Lupus",
        "event_ids": "8b17df4f-c7a6-568b-bba7-e9f0474230ac",
        "author_ids": [
            "2f4e23e5-9feb-53ab-beae-4555370c8f0d"
        ],
        "publisher": "Atrabile",
        "publishing_year": null
    },
    {
        "id": "66419695-ae35-53a0-b7db-55e99b5d6b02",
        "title": "la Baleine Bibliothèque",
        "event_ids": "8b17df4f-c7a6-568b-bba7-e9f0474230ac",
        "author_ids": [
            "095fe88f-e6bc-523c-a338-d927d8a46767",
            "b64f17a8-7cde-5016-a0ba-5e4599ad52f2"
        ],
        "publisher": "le Lombard",
        "publishing_year": null
    },
    {
        "id": "970a07a3-e2a0-5c36-bf0f-9a6f4ea83dad",
        "title": "NononBa",
        "event_ids": "8b17df4f-c7a6-568b-bba7-e9f0474230ac",
        "author_ids": [
            "8c8cfd0d-2ff8-55d1-bf5e-f83410306fb1"
        ],
        "publisher": "Cornelius",
        "publishing_year": null
    },
    {
        "id": "945ced24-f871-580c-a2cd-e55da6520b39",
        "title": "la Revanche des Bibliothécaires",
        "event_ids": "8b17df4f-c7a6-568b-bba7-e9f0474230ac",
        "author_ids": [
            "82f0f18e-ef7e-5f41-8047-ad16d91e05e4"
        ],
        "publisher": "2024",
        "publishing_year": null
    },
    {
        "id": "f276e705-9146-5580-823a-15d8c2591660",
        "title": "Dope Rider",
        "event_ids": "bf7694bb-b7a0-5258-9679-5e32f0e0399f",
        "author_ids": [
            "12d81cb8-0977-5c8d-95e1-546f5eddf90d"
        ],
        "publisher": "Tanibis",
        "publishing_year": null
    },
    {
        "id": "714b0f37-f73f-5508-825c-281074c8aebe",
        "title": "Une nuit avec toi",
        "event_ids": "bf7694bb-b7a0-5258-9679-5e32f0e0399f",
        "author_ids": [
            "3147fff6-a2e8-5fc8-8085-78440711c1b3"
        ],
        "publisher": "Glénat",
        "publishing_year": null
    },
    {
        "id": "c63fb7f3-28e9-51b0-a879-a22cae604ae9",
        "title": "Pluto",
        "event_ids": "bf7694bb-b7a0-5258-9679-5e32f0e0399f",
        "author_ids": [
            "96909ed8-afbc-51b4-828e-cf484c613c2d"
        ],
        "publisher": "Kana",
        "publishing_year": null
    },
    {
        "id": "76da166c-6887-58fe-839c-5ceb1d79b8ee",
        "title": "Boule de Feu",
        "event_ids": "bf7694bb-b7a0-5258-9679-5e32f0e0399f",
        "author_ids": [
            "24f5b427-235c-5460-9de0-85f11a01139a"
        ],
        "publisher": "2024",
        "publishing_year": null
    },
    {
        "id": "4fe38dd6-5f77-5f47-8a7d-4a869f44334a",
        "title": "Cauchemar",
        "event_ids": "1871fd36-4f87-59f2-9dfb-a14b9259289e",
        "author_ids": [
            "3b40ac72-a75f-5c79-bd75-a460f955ae58"
        ],
        "publisher": "l'Employé du moi",
        "publishing_year": null
    },
    {
        "id": "ca07d9e7-2615-5857-8ff2-c8a481345db9",
        "title": "Mécanique Céleste",
        "event_ids": "1871fd36-4f87-59f2-9dfb-a14b9259289e",
        "author_ids": [
            "671a3790-6703-5f60-93f7-4c8096394838"
        ],
        "publisher": "Dargaud",
        "publishing_year": null
    },
    {
        "id": "f9700842-783a-547b-b038-f388c81263c4",
        "title": "Shit is Real",
        "event_ids": "1871fd36-4f87-59f2-9dfb-a14b9259289e",
        "author_ids": [
            "86f3e63b-c414-594e-af58-abfb190ddea2"
        ],
        "publisher": "l'Employé du moi",
        "publishing_year": null
    },
    {
        "id": "e7880ee2-b182-5a13-8a84-f3877bd0a932",
        "title": "Evol",
        "event_ids": "1871fd36-4f87-59f2-9dfb-a14b9259289e",
        "author_ids": [
            "7a222e55-c2c0-5fff-acc7-4a9c36238f5f"
        ],
        "publisher": "Delcourt",
        "publishing_year": null
    },
    {
        "id": "c36e3da5-0be8-5732-a555-fb7a2b9adc95",
        "title": "La Terre des fils",
        "event_ids": "9d44e8ca-98e0-57f9-97c8-957ce1fe0405",
        "author_ids": [
            "1afe6f24-4e41-56d1-a10e-f3bd77b1e3f5"
        ],
        "publisher": "Futuropolis",
        "publishing_year": null
    },
    {
        "id": "a0258b1a-9505-561d-a6a8-ca69479420d8",
        "title": "Le Jeune Albert",
        "event_ids": "9d44e8ca-98e0-57f9-97c8-957ce1fe0405",
        "author_ids": [
            "ae96a2ee-5217-5ca6-b422-07d3393e3b41"
        ],
        "publisher": "Les Humanoïdes Associés",
        "publishing_year": null
    },
    {
        "id": "677a0a0d-9f0e-5524-892e-5feeda95fa37",
        "title": "Revanche",
        "event_ids": "9d44e8ca-98e0-57f9-97c8-957ce1fe0405",
        "author_ids": [
            "2c1293b1-0b71-5d73-9217-34bf2c597b62"
        ],
        "publisher": "Hoochie Coochie",
        "publishing_year": null
    },
    {
        "id": "5ee6ce29-7b61-53b4-8994-a0a2e783cf92",
        "title": "Bone",
        "event_ids": "9d44e8ca-98e0-57f9-97c8-957ce1fe0405",
        "author_ids": [
            "41d4d07a-dd5b-575e-8575-182029f2ffbc"
        ],
        "publisher": "Delcourt",
        "publishing_year": null
    },
    {
        "id": "af4e1bb1-ecf0-5912-8197-9d9e0b210b72",
        "title": "Bagarre Érotique",
        "event_ids": "09591678-ae62-5c46-99bc-8a8b4eaa0ffa",
        "author_ids": [
            "b28aa578-42b6-53f0-ba2e-0e91a837d1cc"
        ],
        "publisher": "Anne Carrière",
        "publishing_year": null
    },
    {
        "id": "fc30f32a-3e20-5385-b28a-7439ee532389",
        "title": "Philémon - le Naufragé du \"A\"",
        "event_ids": "09591678-ae62-5c46-99bc-8a8b4eaa0ffa",
        "author_ids": [
            "2c5d1ecf-6832-57d5-b546-c500ad06204d"
        ],
        "publisher": "Dargaud",
        "publishing_year": null
    },
    {
        "id": "aa01d166-f99b-5537-9d2f-99f433ffdc97",
        "title": "Des maux à dire",
        "event_ids": "09591678-ae62-5c46-99bc-8a8b4eaa0ffa",
        "author_ids": [
            "61d33246-60ce-54a8-9d34-3b08a03ebd0a"
        ],
        "publisher": "Sarbacane",
        "publishing_year": null
    },
    {
        "id": "fc62fcaa-84ef-5a91-a79d-34ee62b436ef",
        "title": "Les Guerres de Lucas",
        "event_ids": "09591678-ae62-5c46-99bc-8a8b4eaa0ffa",
        "author_ids": [
            "0609ba11-9dd6-51a2-a1fa-5945569f3a15",
            "2b7ad5e3-6b65-5786-bd5f-d02f8bcdde29"
        ],
        "publisher": "Deman",
        "publishing_year": null
    },
    {
        "id": "8a50365e-9da9-59dd-bc97-969ed43c22c7",
        "title": "Far Sector",
        "event_ids": "b6b7fc5a-d592-5d96-854f-05558c763187",
        "author_ids": [
            "57a7df47-868e-598d-8320-562a491eec09",
            "29e81ba3-c9a8-5437-a577-2324e84c2a22"
        ],
        "publisher": "Urban Comics",
        "publishing_year": null
    },
    {
        "id": "515abf3f-be71-5dc5-a79a-662cd25fccf6",
        "title": "Play With Fire",
        "event_ids": "b6b7fc5a-d592-5d96-854f-05558c763187",
        "author_ids": [
            "c9b6be22-065c-5547-a9aa-9db3a027d1e6"
        ],
        "publisher": "Ici Même",
        "publishing_year": null
    },
    {
        "id": "0c7c6682-3287-56d0-a8d6-82aea0648529",
        "title": "Nobles Paysans",
        "event_ids": "b6b7fc5a-d592-5d96-854f-05558c763187",
        "author_ids": [
            "c8a7e06b-5246-59d8-988d-2f1dfc3dcbe7"
        ],
        "publisher": "Kurokawa",
        "publishing_year": null
    },
    {
        "id": "debf7682-e9ad-587d-a814-efdeaad2c9e7",
        "title": "Forté",
        "event_ids": "b6b7fc5a-d592-5d96-854f-05558c763187",
        "author_ids": [
            "0399b1c8-5e87-58d3-8ea8-63453280e3bb",
            "83cd0cff-b455-5d5f-b0d2-1620f35ecd54"
        ],
        "publisher": "Dargaud",
        "publishing_year": null
    },
    {
        "id": "e2102e41-2abb-59a4-b7fe-8d4ecc23e1da",
        "title": "Kageki Shojo saison 0",
        "event_ids": "075999c0-bbf4-5524-9f02-8526d66cd913",
        "author_ids": [
            "5c77edf3-4fb1-52ab-ab5c-229c1eb836e8"
        ],
        "publisher": "Noeve Grafx",
        "publishing_year": null
    },
    {
        "id": "956b5864-d695-5e4f-b6f3-48078e019fe0",
        "title": "Gotham Central",
        "event_ids": "075999c0-bbf4-5524-9f02-8526d66cd913",
        "author_ids": [
            "eb085332-9b22-53f0-a527-1e929572ab5a",
            "00db3447-5ed5-5ba8-a2af-2dd9199c5602"
        ],
        "publisher": "Urban Comics",
        "publishing_year": null
    },
    {
        "id": "ab707df2-5f9e-5bce-ba06-da7fc0e88bfd",
        "title": "Cardcaptor Sakura",
        "event_ids": "075999c0-bbf4-5524-9f02-8526d66cd913",
        "author_ids": [
            "969606f1-a82b-5683-8a38-a91089eb9598"
        ],
        "publisher": "Pika",
        "publishing_year": null
    },
    {
        "id": "bde7b6df-1144-56af-8a15-03f3710adb93",
        "title": "Ici même",
        "event_ids": "075999c0-bbf4-5524-9f02-8526d66cd913",
        "author_ids": [
            "f00e5d5f-7bc4-58c0-98a0-7c48ff1b2ead",
            "8519e2d5-a656-5ce0-9642-74f939ba1e60"
        ],
        "publisher": "Casterman",
        "publishing_year": null
    },
    {
        "id": "52b5768f-92ea-5ea0-864c-f91c838da16c",
        "title": "Cosmoknights",
        "event_ids": "7cb0e7e6-cbc0-59b2-a19b-dfe02cee7c85",
        "author_ids": [
            "e1d64487-9066-57a4-a82b-f95b1f11a41f"
        ],
        "publisher": "Bliss",
        "publishing_year": null
    },
    {
        "id": "13a95766-1ae7-52fc-8158-e51115b8fa4a",
        "title": "René•e au bois dormant",
        "event_ids": "7cb0e7e6-cbc0-59b2-a19b-dfe02cee7c85",
        "author_ids": [
            "cc4653dc-b615-54e5-bac1-c35dc48d1341"
        ],
        "publisher": "sarbacane",
        "publishing_year": null
    },
    {
        "id": "39c9b8b4-fc17-5fb3-bda6-7f183cca54c7",
        "title": "Clémence en colère",
        "event_ids": "7cb0e7e6-cbc0-59b2-a19b-dfe02cee7c85",
        "author_ids": [
            "07e138d4-c5e0-5e13-81c4-b924dca78d61"
        ],
        "publisher": "La Ville Brûle",
        "publishing_year": null
    },
    {
        "id": "a01a8124-f371-5a31-a90b-8bcf85d43a7c",
        "title": "titre oublié BD avec grenouille",
        "event_ids": "7a658366-6710-5724-859d-c94de9e9d9ab",
        "author_ids": [],
        "publisher": null,
        "publishing_year": null
    },
    {
        "id": "321c2793-05ba-57fa-abc0-2c59c7c6aaa3",
        "title": "Blacksad pour de faux",
        "event_ids": "7a658366-6710-5724-859d-c94de9e9d9ab",
        "author_ids": [],
        "publisher": null,
        "publishing_year": null
    },
    {
        "id": "5d75aa1d-71ee-5ee7-be23-59e9d10c519a",
        "title": "Titre oublié manga avec enfant",
        "event_ids": "7a658366-6710-5724-859d-c94de9e9d9ab",
        "author_ids": [],
        "publisher": null,
        "publishing_year": null
    },
    {
        "id": "6d437cee-8870-53d7-bffa-9aba1bb92823",
        "title": "Un picsou qui ressemble à Bernard Arnault",
        "event_ids": "7a658366-6710-5724-859d-c94de9e9d9ab",
        "author_ids": [],
        "publisher": null,
        "publishing_year": null
    },
    {
        "id": "1ed863f9-5aea-574a-8e7a-8a8f061235e5",
        "title": "Oiseaux de papier",
        "event_ids": "3d3c0b42-70a2-5146-a04f-9b0782e75776",
        "author_ids": [
            "e91e7e71-ed2e-5acb-a42e-2ad624b8ab41"
        ],
        "publisher": "ça et là",
        "publishing_year": null
    },
    {
        "id": "48a7b58b-aa17-5b0d-98ec-fe8a997395c0",
        "title": "Demande à Modigliani",
        "event_ids": "3d3c0b42-70a2-5146-a04f-9b0782e75776",
        "author_ids": [
            "2d932312-b0bc-5bac-9c2d-dfe07ecede95"
        ],
        "publisher": "Naban",
        "publishing_year": null
    },
    {
        "id": "b089120d-7f10-5457-96b1-b233822e6f5e",
        "title": "Harleen",
        "event_ids": "3d3c0b42-70a2-5146-a04f-9b0782e75776",
        "author_ids": [
            "60d5489b-14e3-518b-9109-e042747d08ff"
        ],
        "publisher": "Urban Comics",
        "publishing_year": null
    },
    {
        "id": "330732a9-e0e1-5cf1-a00d-ecd08a2bc222",
        "title": "Ma famille imaginaire",
        "event_ids": "3d3c0b42-70a2-5146-a04f-9b0782e75776",
        "author_ids": [
            "98f266c0-cb80-5d14-8e5c-697e49b48751"
        ],
        "publisher": "L'Agrume",
        "publishing_year": null
    },
    {
        "id": "d0773c0e-efce-5e3f-b88c-b401e6925875",
        "title": "Barbara l'entre-deux monde",
        "event_ids": "d22485f9-9242-5a72-bc1e-9c223c27134d",
        "author_ids": [
            "45d6dbf8-fbd9-578b-9e9f-8402dc2d31e7"
        ],
        "publisher": "Akata",
        "publishing_year": null
    },
    {
        "id": "4aa33079-62c2-5233-88ae-8e754c339e59",
        "title": "Clementine",
        "event_ids": "d22485f9-9242-5a72-bc1e-9c223c27134d",
        "author_ids": [
            "57c07569-26eb-52d4-ab34-f8c8caa94ccc"
        ],
        "publisher": "Delcourt",
        "publishing_year": null
    },
    {
        "id": "1de89bb4-2d86-543c-845e-fba8f42fc847",
        "title": "Un Orage par jour",
        "event_ids": "d22485f9-9242-5a72-bc1e-9c223c27134d",
        "author_ids": [
            "da949bb6-12f0-5d85-b093-d2ec26926f91"
        ],
        "publisher": "Keribus",
        "publishing_year": null
    },
    {
        "id": "e6eb00f3-e29c-59a5-bf7e-7ca9a65fcd33",
        "title": "La Route",
        "event_ids": "d22485f9-9242-5a72-bc1e-9c223c27134d",
        "author_ids": [
            "d46c7036-5dcf-5b2b-8dc5-d09fabdacbb2"
        ],
        "publisher": "Dargaud",
        "publishing_year": null
    },
    {
        "id": "a9f1ba28-8e3f-5925-8f8c-bd63fb271d1b",
        "title": "Dai Dark",
        "event_ids": "826204d2-0a18-5f15-81c0-1f9730761358",
        "author_ids": [
            "2c0a8d04-1eac-5612-a1c7-676822d9ad90"
        ],
        "publisher": "Soleil",
        "publishing_year": null
    },
    {
        "id": "06d42289-e3ad-57c0-aade-03088507faa9",
        "title": "Les Contes de la mansarde",
        "event_ids": "826204d2-0a18-5f15-81c0-1f9730761358",
        "author_ids": [
            "206efe6f-29f9-5386-b123-f2bbd3f27f6d",
            "d52a43df-2aa2-547e-b98d-830dec705d02"
        ],
        "publisher": "L'Employé du moi",
        "publishing_year": null
    },
    {
        "id": "34373ae6-8241-5dfd-ac94-c657bd97af69",
        "title": "Slava T01",
        "event_ids": "826204d2-0a18-5f15-81c0-1f9730761358",
        "author_ids": [
            "3c90a47b-00bd-5d72-b26e-14e9361de953"
        ],
        "publisher": "Dargaud",
        "publishing_year": null
    },
    {
        "id": "0829463a-3433-53e5-ac54-605311f73a69",
        "title": "It's Lonely at the Center of the Earth",
        "event_ids": "826204d2-0a18-5f15-81c0-1f9730761358",
        "author_ids": [
            "ec033c79-cf70-5028-8b1d-6b02cccf0b5c"
        ],
        "publisher": "Hi Comics",
        "publishing_year": null
    },
    {
        "id": "f95d6e61-6426-5b0b-9311-b9e8ecb36b78",
        "title": "Mekka Nikki",
        "event_ids": "8f478152-30c0-53a8-ae55-0f5108d32a6d",
        "author_ids": [
            "25a92ac6-0606-546b-91d9-21824fdc82a1",
            "ee98cfb4-9b32-5356-b3be-337badf7aa02"
        ],
        "publisher": "Les Humanoïdes associés",
        "publishing_year": null
    },
    {
        "id": "fdf7972d-6b2b-5ace-9939-d1b83cedae14",
        "title": "Le Cas David Zimmerman",
        "event_ids": "8f478152-30c0-53a8-ae55-0f5108d32a6d",
        "author_ids": [
            "3b934034-aca9-5ef9-a4d4-f0dbf63716dd",
            "a531559e-8dbe-5b47-b3b7-b6e452214bd7"
        ],
        "publisher": "Sarbacane",
        "publishing_year": null
    },
    {
        "id": "0f55b110-f82c-5092-8299-3149fdc8c9c9",
        "title": "Au-Dedans",
        "event_ids": "8f478152-30c0-53a8-ae55-0f5108d32a6d",
        "author_ids": [
            "bed4e616-fb1a-51d5-8789-d3a7c519765c"
        ],
        "publisher": "404",
        "publishing_year": null
    },
    {
        "id": "19a60d41-85b5-5230-8e6c-e5537981a6f4",
        "title": "Malgré tout je suis ici",
        "event_ids": "8f478152-30c0-53a8-ae55-0f5108d32a6d",
        "author_ids": [],
        "publisher": "l'Association",
        "publishing_year": null
    },
    {
        "id": "c2f61a7e-3816-5686-b9e5-d9556ee77049",
        "title": "l'Amour Après",
        "event_ids": "28a72776-8abd-56ff-a48b-fe50c1c9add1",
        "author_ids": [
            "c6bfc388-ba3c-5aa7-b627-d7528e7b7f95",
            "ff780b2f-973b-5b78-8aaf-b22f31bc1bb4"
        ],
        "publisher": "Virages Graphiques",
        "publishing_year": null
    },
    {
        "id": "e98c4039-8132-5dd6-9489-661fca8f7743",
        "title": "Adieu Eri",
        "event_ids": "28a72776-8abd-56ff-a48b-fe50c1c9add1",
        "author_ids": [
            "e2139e97-c7d1-5124-b077-ea4291aa3032"
        ],
        "publisher": "Crunchyroll",
        "publishing_year": null
    },
    {
        "id": "e24b2289-3eba-5581-9e3b-7c3d08251f70",
        "title": "Walicho",
        "event_ids": "28a72776-8abd-56ff-a48b-fe50c1c9add1",
        "author_ids": [
            "11f8a644-a339-59d8-af48-8b26d8709fbd"
        ],
        "publisher": "Ça et là",
        "publishing_year": null
    },
    {
        "id": "fb6cbc79-3c98-5889-838a-b334b7606395",
        "title": "Chair à Canon",
        "event_ids": "28a72776-8abd-56ff-a48b-fe50c1c9add1",
        "author_ids": [
            "ae7b2afb-f773-5588-a836-7f22fa49d247"
        ],
        "publisher": "Flblb",
        "publishing_year": null
    },
    {
        "id": "b0b3870c-0997-5868-bd23-6e08e3cc0aac",
        "title": "Mobile Suit Gundam - The origin",
        "event_ids": "3d9441c7-6496-5d72-9e60-65b6ea76742a",
        "author_ids": [
            "06d2e44e-3bc3-5c38-80b2-d2bc46f5a2d5"
        ],
        "publisher": "Vega",
        "publishing_year": null
    },
    {
        "id": "1c9e35cc-80d4-5dce-8e80-2874fe876600",
        "title": "Les Ames enflammées",
        "event_ids": "3d9441c7-6496-5d72-9e60-65b6ea76742a",
        "author_ids": [
            "bac10044-bf28-587c-bf43-2ca135089535"
        ],
        "publisher": "Glénat",
        "publishing_year": null
    },
    {
        "id": "4066190a-e2a3-5eda-bb01-cd996e6b7eda",
        "title": "Planetarium Ghost Travel",
        "event_ids": "3d9441c7-6496-5d72-9e60-65b6ea76742a",
        "author_ids": [
            "5ffbe2d2-ae0e-55cf-b3ab-8c691acbaddf"
        ],
        "publisher": "Renard Doré",
        "publishing_year": null
    },
    {
        "id": "dd62a84b-d5d0-581d-85ff-398583396ee1",
        "title": "Gloutons et Dragons",
        "event_ids": "3d9441c7-6496-5d72-9e60-65b6ea76742a",
        "author_ids": [
            "ac8b85c4-99d5-5de7-a631-34672a8a642e"
        ],
        "publisher": "Sakka",
        "publishing_year": null
    },
    {
        "id": "c7c00974-55df-5ddb-9094-599a49fedc04",
        "title": "Manger",
        "event_ids": "f84bf9dc-cd69-5ea1-8de2-8d84c49c453a",
        "author_ids": [
            "ce1989f6-f25c-5cf4-9899-cb4528ed5422"
        ],
        "publisher": "Cambourakis",
        "publishing_year": null
    },
    {
        "id": "9a3852a3-baa8-5f2a-aba2-fe494ac3d2d7",
        "title": "Agughia",
        "event_ids": "f84bf9dc-cd69-5ea1-8de2-8d84c49c453a",
        "author_ids": [
            "8fe7fe5d-f5d1-57fa-9b23-8613e9714774"
        ],
        "publisher": "Dargaud",
        "publishing_year": null
    },
    {
        "id": "d3ae501d-a740-50fa-9b36-23681a63e221",
        "title": "Je voudrais me suicider mais j'ai pas le temps",
        "event_ids": "f84bf9dc-cd69-5ea1-8de2-8d84c49c453a",
        "author_ids": [
            "31387e90-fc18-5d6c-8a6a-6bd2ceef6053",
            "542d6a4e-eee5-5d28-b43b-1522bc6c23b7"
        ],
        "publisher": "Dargaud",
        "publishing_year": null
    },
    {
        "id": "9e1ead2f-e94b-51c4-a530-25ff413b4630",
        "title": "L'enfantôme",
        "event_ids": "f84bf9dc-cd69-5ea1-8de2-8d84c49c453a",
        "author_ids": [
            "8c3c54b4-5338-5cf9-9db4-e376482d841b"
        ],
        "publisher": "Glénat",
        "publishing_year": null
    },
    {
        "id": "1d9f61ac-e443-5d00-95d6-232abbc96584",
        "title": "Journal d'une disparition",
        "event_ids": "12815554-e509-5c87-be90-52d0ba1546af",
        "author_ids": [
            "0b088127-8e8e-5e67-aade-8ee924e23e14"
        ],
        "publisher": "Kana",
        "publishing_year": null
    },
    {
        "id": "8f3dfff9-18f4-517b-956a-375093f86315",
        "title": "Ballades",
        "event_ids": "12815554-e509-5c87-be90-52d0ba1546af",
        "author_ids": [
            "d34f9a45-6215-5a8a-b4d6-dfb9d6a92541"
        ],
        "publisher": "Atrabile",
        "publishing_year": null
    },
    {
        "id": "9fb8bc86-0c68-5c44-a864-1bd65f4c4114",
        "title": "Julius Corentin Acquefacques, prisonnier des rêves - L'origines",
        "event_ids": "12815554-e509-5c87-be90-52d0ba1546af",
        "author_ids": [
            "a0e8081c-c789-5249-a9ad-938d911d3d15"
        ],
        "publisher": "Delcourt",
        "publishing_year": null
    },
    {
        "id": "69fc7e78-c691-52d1-9568-ff25b698eaab",
        "title": "Âme augmentée",
        "event_ids": "12815554-e509-5c87-be90-52d0ba1546af",
        "author_ids": [
            "1895a4c2-2cf2-5967-b5b1-2b87bfb4c910"
        ],
        "publisher": "404 graphics",
        "publishing_year": null
    },
    {
        "id": "c503e169-f7e8-50eb-bba0-7d391d6a17ce",
        "title": "Petite Forêt",
        "event_ids": "d97b7ed2-8888-563d-a3ab-85aa06e98884",
        "author_ids": [
            "a47f6301-1e18-51f0-8386-ac488ee37b7c"
        ],
        "publisher": "Delcourt",
        "publishing_year": null
    },
    {
        "id": "ebab55bf-6f8b-5ebe-8a63-63805845355c",
        "title": "Stigma, odyssée sporale",
        "event_ids": "d97b7ed2-8888-563d-a3ab-85aa06e98884",
        "author_ids": [
            "e6332846-dc60-5a6c-83ab-f5180adb17d5"
        ],
        "publisher": "Casterman",
        "publishing_year": null
    },
    {
        "id": "599583d1-2538-5fdb-ad77-90fc339b3178",
        "title": "Sentimental Kiss",
        "event_ids": "d97b7ed2-8888-563d-a3ab-85aa06e98884",
        "author_ids": [
            "e582c7f5-c5b4-5f7e-ac05-d3296bfd9708"
        ],
        "publisher": "l'Employé du moi",
        "publishing_year": null
    },
    {
        "id": "510487fd-029b-5a3b-9700-0d11d9582757",
        "title": "Le Roi Méduse",
        "event_ids": "d97b7ed2-8888-563d-a3ab-85aa06e98884",
        "author_ids": [
            "5140c72e-436a-5c58-85af-fde4a31bd1da"
        ],
        "publisher": "Actes Sud BD",
        "publishing_year": null
    },
    {
        "id": "3dddd453-4856-5647-b862-58ee435de96b",
        "title": "Le Nirvana est ici",
        "event_ids": "2e34799f-dc59-5357-a523-c317961dfd16",
        "author_ids": [
            "5a24ef24-132a-56bc-aef0-b3b1529d528e"
        ],
        "publisher": "Seuil",
        "publishing_year": null
    },
    {
        "id": "78e93b93-fff0-5559-a078-8ca878174a6c",
        "title": "Solitude d'un autre genre",
        "event_ids": "2e34799f-dc59-5357-a523-c317961dfd16",
        "author_ids": [
            "091254d8-d0c9-5726-a5c2-f19e2f7c8d92"
        ],
        "publisher": "Pika",
        "publishing_year": null
    },
    {
        "id": "71b57a4d-63c6-5220-b416-c2eacf41695e",
        "title": "Le Requiem du roi des roses",
        "event_ids": "2e34799f-dc59-5357-a523-c317961dfd16",
        "author_ids": [
            "3732fd8e-96c9-58f7-8134-54e3af2e2b77"
        ],
        "publisher": "Kioon",
        "publishing_year": null
    },
    {
        "id": "def98803-9ae8-50cc-9cb5-3d7c8bbc9c7c",
        "title": "La Montagne entre nous",
        "event_ids": "2e34799f-dc59-5357-a523-c317961dfd16",
        "author_ids": [
            "e9c52477-ae82-5bb5-862b-fe4d54df2502",
            "787e0d65-0fe6-5b9f-a9ec-1afe8993ea3d"
        ],
        "publisher": "Sarbacane",
        "publishing_year": null
    },
    {
        "id": "1c16dd39-9b71-570b-adf9-dd949b0876ed",
        "title": "Batman et robin - Année 1",
        "event_ids": "e86ed83c-1690-5160-a736-d4ab397e1adf",
        "author_ids": [
            "c87d7744-49cb-5480-8fd5-ac0903b18d99",
            "643adc5f-050b-514f-855f-2ff87a990c08"
        ],
        "publisher": "Urban",
        "publishing_year": null
    },
    {
        "id": "7ecc3faa-7448-57ea-b3c3-3fe72ddd322b",
        "title": "Tokyo ces jours-ci",
        "event_ids": "e86ed83c-1690-5160-a736-d4ab397e1adf",
        "author_ids": [
            "038c7ffd-f91b-5d74-85b4-4ad2c6c32bf3"
        ],
        "publisher": "Kana",
        "publishing_year": null
    },
    {
        "id": "2577974a-9695-5f41-94a9-6ba5ebd90174",
        "title": "Parker - La Proie",
        "event_ids": "e86ed83c-1690-5160-a736-d4ab397e1adf",
        "author_ids": [
            "16787ee4-56ac-5736-b0b0-2d831ee42d6c",
            "f149dc55-7d01-5e6c-89f4-ed837f8de8b5"
        ],
        "publisher": "Dupuis",
        "publishing_year": null
    },
    {
        "id": "89d152e7-f57c-5b0e-8d95-8f5fad2dc896",
        "title": "Poulet aux prunes",
        "event_ids": "e86ed83c-1690-5160-a736-d4ab397e1adf",
        "author_ids": [
            "9f6d02b9-d58d-521b-bac5-a096f26c125a"
        ],
        "publisher": "l'Association",
        "publishing_year": null
    },
    {
        "id": "55173791-1d25-5974-be37-4ae3bfac5225",
        "title": "Poème du vent et des arbres",
        "event_ids": "f60c9074-4b14-5a21-8163-ab8c49f0d987",
        "author_ids": [
            "d6e87a93-7b87-56df-b0b5-784f597acfd5"
        ],
        "publisher": "Naban",
        "publishing_year": null
    },
    {
        "id": "d2606770-6e64-56ad-9f24-2c1734030214",
        "title": "Alyte",
        "event_ids": "f60c9074-4b14-5a21-8163-ab8c49f0d987",
        "author_ids": [
            "fab79174-cd77-5bff-8ef0-204115fd6685"
        ],
        "publisher": "2042",
        "publishing_year": null
    },
    {
        "id": "ba70089b-dc50-5706-ae33-e7b7f3d3c4ed",
        "title": "Come Over Come Over",
        "event_ids": "f60c9074-4b14-5a21-8163-ab8c49f0d987",
        "author_ids": [
            "044a392b-edae-5a8b-bf64-8bc911b445b8"
        ],
        "publisher": "Ça et Là",
        "publishing_year": null
    },
    {
        "id": "c422ca47-19e7-5530-96ae-3099c5ec9dc8",
        "title": "Hollywood menteur",
        "event_ids": "f60c9074-4b14-5a21-8163-ab8c49f0d987",
        "author_ids": [
            "466e5af5-67e4-5fcb-b087-0e8d4f1a7ed6"
        ],
        "publisher": "Futuropolis",
        "publishing_year": null
    },
    {
        "id": "7b60d495-19b6-5aec-83d2-df40acb1d3e8",
        "title": "Les faux lieux",
        "event_ids": "b148c708-8268-57c5-987d-7c673b310cee",
        "author_ids": [
            "cf14aca0-99b7-5e93-bac5-cc55c93da085"
        ],
        "publisher": "Akileos",
        "publishing_year": null
    },
    {
        "id": "7afa0be1-9f65-5af9-b8ca-8febc5ccfa4a",
        "title": "Oh, Lenny",
        "event_ids": "b148c708-8268-57c5-987d-7c673b310cee",
        "author_ids": [
            "413f2343-f0c5-5672-aa0a-050973a682f9"
        ],
        "publisher": "Tanibis",
        "publishing_year": null
    },
    {
        "id": "ec34073f-32f3-5b74-8e70-eb2e9937a36f",
        "title": "Ranma 1/2",
        "event_ids": "b148c708-8268-57c5-987d-7c673b310cee",
        "author_ids": [
            "aea68d40-ddb1-5354-b4e8-5fb4dbca4c9e"
        ],
        "publisher": "Glénat",
        "publishing_year": null
    },
    {
        "id": "fd110a14-3cb4-5407-a837-b3bae1c9b278",
        "title": "Les Yeux d'Alex",
        "event_ids": "b148c708-8268-57c5-987d-7c673b310cee",
        "author_ids": [
            "cb6b2c97-9182-501d-90a0-2c812dd7d641"
        ],
        "publisher": "Glénat",
        "publishing_year": null
    },
    {
        "id": "af92af68-880b-54ec-9b11-b63ac826149b",
        "title": "Billy Bat",
        "event_ids": "94e69eb9-e081-52d8-a886-1e8990ac7c1b",
        "author_ids": [
            "96909ed8-afbc-51b4-828e-cf484c613c2d"
        ],
        "publisher": "Pika",
        "publishing_year": null
    },
    {
        "id": "0227a664-60ac-5e77-bb89-031cf0893d1e",
        "title": "Road to Nowhere",
        "event_ids": "94e69eb9-e081-52d8-a886-1e8990ac7c1b",
        "author_ids": [
            "e7455245-dd03-5c13-a656-e0c6420e9265"
        ],
        "publisher": "Misma",
        "publishing_year": null
    },
    {
        "id": "bb2f4bd6-ea0d-5028-bd8d-d3eb6437888c",
        "title": "Ushima, l'usurier de l'ombre",
        "event_ids": "94e69eb9-e081-52d8-a886-1e8990ac7c1b",
        "author_ids": [
            "3ed49b39-8117-577d-ba13-6ac94a9e388b"
        ],
        "publisher": "Kana",
        "publishing_year": null
    },
    {
        "id": "543529b3-41ab-5afc-a381-7ed1bfab677b",
        "title": "Soichi",
        "event_ids": "94e69eb9-e081-52d8-a886-1e8990ac7c1b",
        "author_ids": [
            "bac0e452-b75b-5cc7-a4e4-ad8adf9ba347"
        ],
        "publisher": "Mangetsu",
        "publishing_year": null
    },
    {
        "id": "11d7eace-ebf2-59d3-a330-cd442d3557a3",
        "title": "Quand souffle le vent",
        "event_ids": "22747bbf-a596-5a9a-aaea-99acc760e0d9",
        "author_ids": [
            "4abb5d53-7a59-5901-8c93-7de96ba7c098"
        ],
        "publisher": "Tanibis",
        "publishing_year": null
    },
    {
        "id": "1bc85f3d-8932-5b00-b6fd-333b32ee53b9",
        "title": "Saint-Elme",
        "event_ids": "22747bbf-a596-5a9a-aaea-99acc760e0d9",
        "author_ids": [
            "3254de0b-373e-565d-9416-53a8316474c8",
            "2f4e23e5-9feb-53ab-beae-4555370c8f0d"
        ],
        "publisher": "Delcourt",
        "publishing_year": null
    },
    {
        "id": "605a6f52-dfac-5d30-9135-70f21673a9c9",
        "title": "Lettre à Blue bird",
        "event_ids": "22747bbf-a596-5a9a-aaea-99acc760e0d9",
        "author_ids": [
            "bb3b2c50-6f6f-552e-a8aa-c43c4c7b9427"
        ],
        "publisher": "Frémok",
        "publishing_year": null
    },
    {
        "id": "a8920edf-9eb7-5296-9429-4a13002c70c4",
        "title": "Sacrifice",
        "event_ids": "22747bbf-a596-5a9a-aaea-99acc760e0d9",
        "author_ids": [
            "f7168e39-bf20-5d5a-91f5-7b0b971b588c",
            "8b277120-560b-5807-b3c5-c0a546bce427"
        ],
        "publisher": "Urban",
        "publishing_year": null
    },
    {
        "id": "980619c8-13ee-54cf-960c-0ad3a452965b",
        "title": "Helen de Wyndhorn",
        "event_ids": "72255258-5a8d-5944-9c4c-0f6f07a6db10",
        "author_ids": [
            "67021253-b3f9-5131-a5a1-6f1e6996c8bd",
            "04566a81-2c42-5f40-84bf-169e9ff41670"
        ],
        "publisher": "Glénat",
        "publishing_year": null
    },
    {
        "id": "80dbe48d-5ef6-50a1-8f93-23619b07cbde",
        "title": "Abélard",
        "event_ids": "72255258-5a8d-5944-9c4c-0f6f07a6db10",
        "author_ids": [
            "7a56b388-39a7-5b66-af71-1a9304760e4a",
            "a7e5dfca-337c-58a2-8dfb-d1469b851bd9"
        ],
        "publisher": "Dargaud",
        "publishing_year": null
    },
    {
        "id": "30dd4d30-1325-557c-b42b-6ad0894bf6b8",
        "title": "Il y a longtemps que je t'aime",
        "event_ids": "72255258-5a8d-5944-9c4c-0f6f07a6db10",
        "author_ids": [
            "da90896c-8026-554d-a736-441570b78261"
        ],
        "publisher": "Casterman",
        "publishing_year": null
    },
    {
        "id": "50afc3e1-c60e-5915-b756-8b0760228a32",
        "title": "Pilou l'apprenti gigolo",
        "event_ids": "72255258-5a8d-5944-9c4c-0f6f07a6db10",
        "author_ids": [
            "04cef3b4-6b2a-5efc-85f2-2a0ff95481cd"
        ],
        "publisher": "IMHO",
        "publishing_year": null
    },
    {
        "id": "8a2399e8-979b-5ac8-9645-0c778e3f4edc",
        "title": "Absolute Batman",
        "event_ids": "59b9a96e-b2d0-5d31-9167-293aed303df5",
        "author_ids": [
            "d4584704-3ebe-5a6f-b8f9-bf17fa741a33",
            "dfaa83f5-acf7-5b22-baf7-0bf497056f9e"
        ],
        "publisher": "Urban Comics",
        "publishing_year": null
    },
    {
        "id": "22420ca8-73c3-508a-a4ca-2f9378f14338",
        "title": "Tête de chien",
        "event_ids": "59b9a96e-b2d0-5d31-9167-293aed303df5",
        "author_ids": [
            "2ceec585-d739-59b6-948a-6b8117a74f5e",
            "d1a00a6a-c6a2-526c-8bca-05745c2bdcc0"
        ],
        "publisher": "Dargaud",
        "publishing_year": null
    },
    {
        "id": "46c2d81c-4961-5353-9c99-230e81b565d0",
        "title": "Soli Deo Gloria",
        "event_ids": "59b9a96e-b2d0-5d31-9167-293aed303df5",
        "author_ids": [
            "69eb4ee1-b8a0-50b0-adec-5f64e115725a",
            "1a9c1499-d284-5ffe-9045-4e3918619a42"
        ],
        "publisher": "Dupuis",
        "publishing_year": null
    }
];

const authors = [
    {
        "id": "fd51ff5e-d84e-5eae-8cd0-e095e96e3dba",
        "name": "Jonathan Hickman",
        "bd_ids": [
            "7d723523-0d8a-5c4f-a040-8ff0cca2bc83"
        ]
    },
    {
        "id": "2503e0ea-8931-5458-afc8-90b272d6baa0",
        "name": "Asa Grennvall",
        "bd_ids": [
            "403fb2b2-7948-5aa1-9cbe-2e9e468a9c05"
        ]
    },
    {
        "id": "bdb4565e-067f-56ca-8936-a076246543f4",
        "name": "Dominique Goblet",
        "bd_ids": [
            "d0dbce49-10b1-5c8d-8c0e-20f9c9c83c98"
        ]
    },
    {
        "id": "2027444e-c012-54a3-aec8-f68484ffe1eb",
        "name": "Kai Pfeiffer",
        "bd_ids": [
            "d0dbce49-10b1-5c8d-8c0e-20f9c9c83c98"
        ]
    },
    {
        "id": "a7e5dfca-337c-58a2-8dfb-d1469b851bd9",
        "name": "Renaud Dillies",
        "bd_ids": [
            "79894bab-2308-5561-b5ba-b688a26f6672",
            "80dbe48d-5ef6-50a1-8f93-23619b07cbde"
        ]
    },
    {
        "id": "43871c3f-7878-50fd-8691-838780202913",
        "name": "Dylan Horrocks",
        "bd_ids": [
            "995dd270-3ead-51df-a96b-919cd922cbea"
        ]
    },
    {
        "id": "bd00fc5a-20dc-576b-bad2-a3336306d052",
        "name": "Usamaru Furuya",
        "bd_ids": [
            "76b4d2f1-cdb5-5aae-9479-3daf719d8adb"
        ]
    },
    {
        "id": "402fbda6-fe33-5e95-a64c-4385f9029a38",
        "name": "Jean-Michel Dupont",
        "bd_ids": [
            "06175f53-82fc-5df0-a3d6-33be607df9c8",
            "75fc73a4-84d6-50f0-99d9-b7445c392bb8"
        ]
    },
    {
        "id": "499e8af8-50a7-57f3-8d89-f5d793796f9d",
        "name": "Mezzo",
        "bd_ids": [
            "06175f53-82fc-5df0-a3d6-33be607df9c8",
            "75fc73a4-84d6-50f0-99d9-b7445c392bb8"
        ]
    },
    {
        "id": "5140c72e-436a-5c58-85af-fde4a31bd1da",
        "name": "Brecht Evens",
        "bd_ids": [
            "8f57610f-1014-5596-8015-17b94899cd58",
            "510487fd-029b-5a3b-9700-0d11d9582757"
        ]
    },
    {
        "id": "298957cc-14c1-506e-b3d1-61603cbccd87",
        "name": "Francis Masse",
        "bd_ids": [
            "dc370931-0191-5023-a121-09e365903d81"
        ]
    },
    {
        "id": "72a26f1a-77d7-531c-a4f4-2018eeb616ce",
        "name": "Francois Lepage",
        "bd_ids": [
            "4c2f3bd9-177e-561b-a197-3579528230ae"
        ]
    },
    {
        "id": "b678c865-cc90-539b-8e87-b8b7bd979836",
        "name": "Emmanuel Lepage",
        "bd_ids": [
            "4c2f3bd9-177e-561b-a197-3579528230ae"
        ]
    },
    {
        "id": "6b6badf0-ebf9-58a7-8c65-f1d065349439",
        "name": "Kurt Busiek",
        "bd_ids": [
            "979cc21c-4c87-5805-b5f5-6f5f3f1606d2"
        ]
    },
    {
        "id": "fa90699d-7b23-523d-b295-cb62820b4f9b",
        "name": "Stuart Immonen",
        "bd_ids": [
            "979cc21c-4c87-5805-b5f5-6f5f3f1606d2"
        ]
    },
    {
        "id": "0cf5be42-674c-5e17-9e49-7fb184b1431c",
        "name": "Jérémy Le Corvaisier",
        "bd_ids": [
            "beee135e-1fed-5a0c-9083-dde2ebaec54d"
        ]
    },
    {
        "id": "d4584704-3ebe-5a6f-b8f9-bf17fa741a33",
        "name": "Scott Snyder",
        "bd_ids": [
            "913d07b5-d10c-59ba-9f1d-9a2b4c3ad13d",
            "8a2399e8-979b-5ac8-9645-0c778e3f4edc"
        ]
    },
    {
        "id": "f2c424bc-1c49-51c1-b24c-e35a2aa03969",
        "name": "Sean Murphy",
        "bd_ids": [
            "913d07b5-d10c-59ba-9f1d-9a2b4c3ad13d",
            "112b74f7-40f7-535a-aab9-b13d3c94c4d2"
        ]
    },
    {
        "id": "3bb69f39-439a-56b4-8c8b-84229ff231ba",
        "name": "Jerome Charyn",
        "bd_ids": [
            "db8922f2-954d-5063-9ca0-699e952b7520"
        ]
    },
    {
        "id": "4d4f91cb-cbe7-5303-8271-d641cf6a6221",
        "name": "Francois Boucq",
        "bd_ids": [
            "db8922f2-954d-5063-9ca0-699e952b7520"
        ]
    },
    {
        "id": "0eb89bcb-1cb8-54fb-84dd-ae9d7268c805",
        "name": "Antoine Marchalot",
        "bd_ids": [
            "3da21605-8214-54c2-b22c-e217a9c9ce93"
        ]
    },
    {
        "id": "95fa1c0a-912a-55cc-8056-f531d33f882e",
        "name": "Olivier Bocquet",
        "bd_ids": [
            "8912ab3c-bf35-5595-bdb9-3c6357a2e7b9"
        ]
    },
    {
        "id": "48f4c9b6-4f07-53ad-bd78-dfc79b024297",
        "name": "Julie Rocheleau",
        "bd_ids": [
            "8912ab3c-bf35-5595-bdb9-3c6357a2e7b9",
            "9c926764-7669-5585-8219-0f0fb31f3498"
        ]
    },
    {
        "id": "54ffe919-5f0b-553a-bd79-e6c9314fe6ba",
        "name": "Delphine Panique",
        "bd_ids": [
            "43bbd0e5-e692-5e43-950a-eb10bd288972"
        ]
    },
    {
        "id": "f22a840a-ae7b-585b-b790-d0e5e0a22043",
        "name": "Tetsuya Tsutsui",
        "bd_ids": [
            "f5bfa282-0bba-5c25-819a-7189c4fa979f"
        ]
    },
    {
        "id": "617cfc5a-f2fa-5b31-9e82-f0e71d742d38",
        "name": "Gilbert Hernandez",
        "bd_ids": [
            "38c7eb79-a784-51a2-bf4e-94b788834ea9"
        ]
    },
    {
        "id": "82b73354-e24a-5897-a4d7-a14c69097c14",
        "name": "Grant Morrison",
        "bd_ids": [
            "aaa5174a-d012-5a86-83ff-88ee561cee78"
        ]
    },
    {
        "id": "950aea29-52b1-5b38-916e-69bd7222eed0",
        "name": "Frank Quitely",
        "bd_ids": [
            "aaa5174a-d012-5a86-83ff-88ee561cee78",
            "2ab19c62-8468-5b16-99a6-f5b97153b993"
        ]
    },
    {
        "id": "e2973a8e-b6fe-5378-b489-513f29620f71",
        "name": "Jean-Pierre Dionnet",
        "bd_ids": [
            "a8f38346-3d87-5afd-9d0c-423aea300f2a"
        ]
    },
    {
        "id": "06153a78-09a9-505d-94b2-6d01b716bd24",
        "name": "Michel Pirus",
        "bd_ids": [
            "a8f38346-3d87-5afd-9d0c-423aea300f2a"
        ]
    },
    {
        "id": "f51793e5-443e-5f81-a04e-65fb91a807e1",
        "name": "Marion Fayolle",
        "bd_ids": [
            "09bf28a9-0ce1-5a09-a99c-a21fcffed008"
        ]
    },
    {
        "id": "d8152d45-6327-555b-bab0-5773452caeed",
        "name": "Isabel Greenberg",
        "bd_ids": [
            "d6cae607-a1ff-5926-a3f2-bb062c84ffb8",
            "6cbc856d-bbf3-517d-8096-69dcf2e9b270"
        ]
    },
    {
        "id": "e09ec5a1-670e-5f3d-9f32-349c029bac21",
        "name": "Nicolas de Crécy",
        "bd_ids": [
            "ae0bc9de-368c-501b-bad7-5bbbe89576fb"
        ]
    },
    {
        "id": "61b42f2a-c779-5680-b591-6e6128f1a1b7",
        "name": "Simon Spurrier",
        "bd_ids": [
            "20d228c3-067c-5067-90c8-cb8cc271fe6f"
        ]
    },
    {
        "id": "42648312-3057-56f3-a03c-346bc337f3f8",
        "name": "Jeff Stokely",
        "bd_ids": [
            "20d228c3-067c-5067-90c8-cb8cc271fe6f"
        ]
    },
    {
        "id": "8de0a770-0d52-5e17-97db-ef10383eb7e6",
        "name": "Alex Baladi",
        "bd_ids": [
            "fa873fe7-0449-5f89-8fc9-cfe1654b8041",
            "9b7133ae-5594-5171-a72d-28be9d48ac38"
        ]
    },
    {
        "id": "742c3aed-25a1-5152-a908-bd41647dc69a",
        "name": "Vehlmann",
        "bd_ids": [
            "795622ed-bfb2-50c3-8569-fb6f10d3cddd"
        ]
    },
    {
        "id": "b818290e-2fbd-585a-828a-479920a33e88",
        "name": "Kerascoët",
        "bd_ids": [
            "795622ed-bfb2-50c3-8569-fb6f10d3cddd"
        ]
    },
    {
        "id": "3c63d44c-9b4f-596e-9bd5-84c3786f15dd",
        "name": "Scott McCloud",
        "bd_ids": [
            "e49de7c1-067d-5937-b900-075d3a2f7799"
        ]
    },
    {
        "id": "32df707a-3433-582f-b61e-ae27388d4713",
        "name": "Debbie Drechsler",
        "bd_ids": [
            "cef800c9-32c9-52ab-bf7c-f734ba6c65db"
        ]
    },
    {
        "id": "b4e9729a-f1c7-5994-b791-a4c365333f5b",
        "name": "Inio Asano",
        "bd_ids": [
            "7b7682a7-12fd-5c89-81c1-ce4b2ec3cedd",
            "49643a22-7c3c-590e-909d-2b458a3c9812",
            "3c1a9222-8bc6-5dc9-9f80-8d86851d8aec",
            "90278e20-06f0-50f8-a8f0-04b97acfe3ce"
        ]
    },
    {
        "id": "000c49b2-0453-5107-a06f-58c9b1fea271",
        "name": "Stéphane Levallois",
        "bd_ids": [
            "485c9772-b7f3-5b59-99a0-5bc51d90677a"
        ]
    },
    {
        "id": "b4ba44f4-199f-5988-8479-e4422af71a49",
        "name": "Shintaro Kago",
        "bd_ids": [
            "70aad9fb-30b1-5177-8126-c531467c028e",
            "18b43f2b-e8c9-553e-92e1-c13027830753",
            "553ba159-d15e-5f69-a159-fc28c71edeca"
        ]
    },
    {
        "id": "94dabec5-6d21-52f5-bcb2-0298eeca942e",
        "name": "Zep",
        "bd_ids": [
            "f9920e4a-7ba8-5f19-8842-ceaf65dd8b9d"
        ]
    },
    {
        "id": "40a78c44-4310-5562-8dc7-76d43d290bda",
        "name": "Max de Radiguès",
        "bd_ids": [
            "9f0067bc-02b7-50da-a83e-61b896fc352d"
        ]
    },
    {
        "id": "86b380e5-e629-5310-a14c-a81874f5b0be",
        "name": "Benoit Vidal",
        "bd_ids": [
            "da2485f6-6f49-5a22-a601-34c06f8fe55f"
        ]
    },
    {
        "id": "b51e43e0-93f2-5e19-a4ea-6c9847f8a7e3",
        "name": "Florence Dupré la Tour",
        "bd_ids": [
            "fb96800d-99ad-51c1-a1e8-f27c7d8fbb10"
        ]
    },
    {
        "id": "bb4e4e79-2608-504d-8924-888397c60925",
        "name": "Benjamin Renner",
        "bd_ids": [
            "94bd0510-12eb-51a0-a26e-0c444a702785"
        ]
    },
    {
        "id": "073d9082-a5d3-506a-985d-eb0aebe059a8",
        "name": "Killoffer",
        "bd_ids": [
            "36e7eb28-ed60-5818-bc3a-eb39ae1e3105"
        ]
    },
    {
        "id": "ce0db7bb-6bd3-522e-bc15-0b4f81ad598e",
        "name": "Philippe Richelle",
        "bd_ids": [
            "331c85b8-47f5-56b5-bdb2-c4ad8b36a229"
        ]
    },
    {
        "id": "ecb4c9b9-3668-504e-b85a-91058c2412a2",
        "name": "Frédéric Rébéna",
        "bd_ids": [
            "331c85b8-47f5-56b5-bdb2-c4ad8b36a229"
        ]
    },
    {
        "id": "e9d80524-250a-5eed-b35a-7c4e80bac050",
        "name": "Didier Quella-Guyot",
        "bd_ids": [
            "6dcd8372-864e-593c-aa7b-d1c4421ca80a"
        ]
    },
    {
        "id": "9425decb-3a8b-5e37-aac5-5ccb7a8b06d7",
        "name": "Sébastien Morice",
        "bd_ids": [
            "6dcd8372-864e-593c-aa7b-d1c4421ca80a"
        ]
    },
    {
        "id": "96f050f1-d364-5995-835b-e0735f743da1",
        "name": "Derf Backderf",
        "bd_ids": [
            "ee4b52be-c659-5eff-ae4e-44cebfeb024c"
        ]
    },
    {
        "id": "9ce7b8ea-d8e8-5148-be02-bd7675f97a2e",
        "name": "Toshifumi Sakurai",
        "bd_ids": [
            "e9a8d3e6-7671-5522-9438-1ca74a7d4a54",
            "9ea2ba3b-2b4e-5225-9479-85a8b1c8761a"
        ]
    },
    {
        "id": "0de81355-7467-5c84-ac5a-fda83bddd329",
        "name": "Christopher Hittinger",
        "bd_ids": [
            "bab472e5-dba8-56e8-94b4-eaca12df0767"
        ]
    },
    {
        "id": "55310ba7-320a-5abb-8b39-eff41549b0f1",
        "name": "Fabien Nury",
        "bd_ids": [
            "5879ed08-b528-54fa-b889-cb9b6654c5e6"
        ]
    },
    {
        "id": "5c38e890-27df-567f-9c6f-bcec8ceea617",
        "name": "Xavier Dorison",
        "bd_ids": [
            "5879ed08-b528-54fa-b889-cb9b6654c5e6"
        ]
    },
    {
        "id": "a0303dba-bfa5-5dbc-8c2a-7cc1352a5f7e",
        "name": "Laurent Astier",
        "bd_ids": [
            "5879ed08-b528-54fa-b889-cb9b6654c5e6"
        ]
    },
    {
        "id": "33d9e522-4553-5c30-84d9-90627de2766d",
        "name": "Jano",
        "bd_ids": [
            "c8efe667-cfa0-5265-92b3-8f32fbeb53b1"
        ]
    },
    {
        "id": "6784186c-7620-5323-ba49-f65e51e6ae6f",
        "name": "Erich Ohser",
        "bd_ids": [
            "0ee6ba43-46ad-5c80-8a2e-5114850d943b"
        ]
    },
    {
        "id": "1447e129-555d-532d-8df9-d42e6407feef",
        "name": "Dennis O'Neil",
        "bd_ids": [
            "bfaec5be-c8a1-5bc8-a268-c883a4cd4ffe"
        ]
    },
    {
        "id": "21ea33cb-1507-5e60-80c3-10871c80788b",
        "name": "Neal Adams",
        "bd_ids": [
            "bfaec5be-c8a1-5bc8-a268-c883a4cd4ffe"
        ]
    },
    {
        "id": "dd7e20bf-bcd1-5b90-a7d5-96c2ef461276",
        "name": "Dan Adkins",
        "bd_ids": [
            "bfaec5be-c8a1-5bc8-a268-c883a4cd4ffe"
        ]
    },
    {
        "id": "93d9e02c-ca19-59ba-a0ff-fe436c3a55bf",
        "name": "Pozla",
        "bd_ids": [
            "5cad8b88-954e-5800-bf00-9a0844b4317d"
        ]
    },
    {
        "id": "fbc80bf7-51eb-58fc-b8c2-66228d9518a3",
        "name": "Jay Hosler",
        "bd_ids": [
            "a1271973-c370-5a5f-a7d4-8feb30577f49"
        ]
    },
    {
        "id": "0ca16d5c-a8ba-5db2-9f06-f74b056d9c83",
        "name": "Adrien Demont",
        "bd_ids": [
            "169ce90d-4993-5277-b4b4-898b948ae30b"
        ]
    },
    {
        "id": "1a15581a-5279-5430-876c-2e8ffa8ff9a9",
        "name": "Lorenzo Mattotti",
        "bd_ids": [
            "c11af8d5-9a5d-5d5d-8a37-806ab326e55e"
        ]
    },
    {
        "id": "c1ffebeb-922e-5aec-a97e-43302c30360d",
        "name": "Julia Wertz",
        "bd_ids": [
            "acef282e-003f-5e71-a1db-09b55471da17",
            "af8eb788-7a27-5205-84b1-ae1298595b7d"
        ]
    },
    {
        "id": "d0b44328-312e-5462-94fc-6071926328cf",
        "name": "Fred Bernard",
        "bd_ids": [
            "429db244-0244-5954-aed2-67933069011e"
        ]
    },
    {
        "id": "64050749-07c1-53a7-82b9-41a75f355e82",
        "name": "Sergio Toppi",
        "bd_ids": [
            "a287fabc-b371-534f-b5ae-bce6b907b35f"
        ]
    },
    {
        "id": "d95d8155-cb3d-51b6-aa89-a6c1c7d4efda",
        "name": "Richard McGuire",
        "bd_ids": [
            "ea17e67e-3aed-5734-bee3-23d291cb2e65"
        ]
    },
    {
        "id": "307d6d57-5e9c-5093-81f8-c14ebd1a70bf",
        "name": "Brian Azzarello",
        "bd_ids": [
            "5c6c2ec3-ceeb-5561-af33-6dc9d7f3f5c4"
        ]
    },
    {
        "id": "87b5bd4e-962b-5128-b63a-fcb5a620a097",
        "name": "Lee Bermejo",
        "bd_ids": [
            "5c6c2ec3-ceeb-5561-af33-6dc9d7f3f5c4"
        ]
    },
    {
        "id": "7ca4b9c7-18bd-5d69-9771-bd4f479f8b57",
        "name": "Sophie Guerrive",
        "bd_ids": [
            "1fe8553a-dc4f-557c-b0c8-ed285d25d513",
            "92d4a711-7df9-52a6-aef4-35cf71bbc16a"
        ]
    },
    {
        "id": "07e138d4-c5e0-5e13-81c4-b924dca78d61",
        "name": "Mirion Malle",
        "bd_ids": [
            "d7db5c18-6776-5197-b68c-f61569bd178a",
            "39c9b8b4-fc17-5fb3-bda6-7f183cca54c7"
        ]
    },
    {
        "id": "29c51d18-72d7-5715-8d93-7f49418467af",
        "name": "Lewis Trondheim",
        "bd_ids": [
            "8cf6bed4-1fb3-55c1-a44b-1d26a4467c32"
        ]
    },
    {
        "id": "63e6bbf9-501c-5cab-a447-df8eca94278c",
        "name": "Nicolas Keramidas",
        "bd_ids": [
            "8cf6bed4-1fb3-55c1-a44b-1d26a4467c32"
        ]
    },
    {
        "id": "d46c7036-5dcf-5b2b-8dc5-d09fabdacbb2",
        "name": "Manu Larcenet",
        "bd_ids": [
            "f2860692-948f-5d47-b998-60f799a21268",
            "e6eb00f3-e29c-59a5-bf7e-7ca9a65fcd33"
        ]
    },
    {
        "id": "5ad0a9e1-5ffa-5c14-a110-f2130ce3514f",
        "name": "Emre Orhun",
        "bd_ids": [
            "69f9074f-83c0-57ba-977b-1125d2fbae16"
        ]
    },
    {
        "id": "e7bad250-6da0-56ae-ab7c-bb32c2243587",
        "name": "Julie Delporte",
        "bd_ids": [
            "e71a06a2-fc10-56f0-b0a6-f5b1ec6ce8d4",
            "b2b56cf4-189b-5c0f-b0a9-b3f4944df2f8"
        ]
    },
    {
        "id": "5dffb67a-5aac-5df7-8cff-c42c4085749e",
        "name": "Loo Hui Phang",
        "bd_ids": [
            "3bb145fc-9ba1-546b-84c5-b9bd43d58ef3"
        ]
    },
    {
        "id": "2f4e23e5-9feb-53ab-beae-4555370c8f0d",
        "name": "Frederik Peeters",
        "bd_ids": [
            "3bb145fc-9ba1-546b-84c5-b9bd43d58ef3",
            "a2edcba9-4069-57fa-860a-9b0f656b7911",
            "46840f52-8e72-51fa-8308-bfe9e584b7c8",
            "1bc85f3d-8932-5b00-b6fd-333b32ee53b9"
        ]
    },
    {
        "id": "7fe75a35-1d64-517a-885f-630c30ee6ba0",
        "name": "Philippe Foerster",
        "bd_ids": [
            "80fb2922-29f9-5231-ba34-224676df214b"
        ]
    },
    {
        "id": "c5e6aaf1-2b53-5f0e-bce2-0c4c94f86c6f",
        "name": "Takano Ichigo",
        "bd_ids": [
            "31218cb7-1c1c-5c1e-ba45-3383eb2db2a4"
        ]
    },
    {
        "id": "09ba303e-ed68-5c29-bac3-42f3ca9dc165",
        "name": "Victor Hussenot",
        "bd_ids": [
            "d6777df6-7ff7-5d60-883a-8b4a3ea24742"
        ]
    },
    {
        "id": "453525aa-7f27-5d42-ba7b-d5459af791fc",
        "name": "Matthieu Bonhomme",
        "bd_ids": [
            "0f4c7769-b9a0-5d86-90c2-0dab9cdecac5"
        ]
    },
    {
        "id": "a1538e2c-43f9-5a42-8d71-008ad928bf75",
        "name": "Matthieu Chiara",
        "bd_ids": [
            "50457d0a-d275-54ae-a701-73038d4557e5"
        ]
    },
    {
        "id": "d9ccf51f-773d-5fc2-96b6-c595993dc4d5",
        "name": "Pierre Boisserie",
        "bd_ids": [
            "ff97eec9-4561-5965-b9fd-31a81ed88ca1"
        ]
    },
    {
        "id": "9329ecf2-fb88-5cda-93d0-4d796212135a",
        "name": "Nicolas Bara",
        "bd_ids": [
            "ff97eec9-4561-5965-b9fd-31a81ed88ca1"
        ]
    },
    {
        "id": "c533d6df-4b35-5261-9157-fa3cef0e4088",
        "name": "Martin Emond",
        "bd_ids": [
            "f6807abd-c884-551c-ad68-32d7182e64bc"
        ]
    },
    {
        "id": "8d89626c-33ca-5927-9738-0bf520f4b52e",
        "name": "Zerocalcare",
        "bd_ids": [
            "13cec0e3-d7e3-54da-be39-8ea04750452b"
        ]
    },
    {
        "id": "6036d73a-1f6b-581b-8e41-74a385c4be82",
        "name": "Liv Strömquist",
        "bd_ids": [
            "4855cab9-a793-5a3b-b9ed-a1ae11a4cb96",
            "5bebe1b3-ed45-5b99-bc12-026abccc686e"
        ]
    },
    {
        "id": "e98c2e27-b0f3-5c53-b4b4-6deb8dd0969b",
        "name": "Alejandro Jodorowsky",
        "bd_ids": [
            "b84e2de9-9773-5fb3-b098-95600aabefb4",
            "b94bc845-eb86-5631-9fb8-fcaf3f1b0ed5"
        ]
    },
    {
        "id": "a0b94843-ddbb-5e2e-94f4-31715a79ae96",
        "name": "Ladrönn",
        "bd_ids": [
            "b84e2de9-9773-5fb3-b098-95600aabefb4"
        ]
    },
    {
        "id": "8d7dbf62-af3b-5183-9758-a74bff3e93b2",
        "name": "Nylso",
        "bd_ids": [
            "6abe3396-863c-534c-ab1f-f19543d6c60d",
            "e0079da4-868b-589a-8dc6-7c04973b026b"
        ]
    },
    {
        "id": "64bcc6da-c0b5-540c-a6a6-eaeb6731bbf8",
        "name": "Daniel Clowes",
        "bd_ids": [
            "72f2081f-6273-5dc2-8c7b-28dc3370c098",
            "5c0d585f-9e55-51fb-bb16-f98389cb7ce4"
        ]
    },
    {
        "id": "65e00d00-102a-5d11-a8ee-1ae12e5f8022",
        "name": "Yukito Kishiro",
        "bd_ids": [
            "2e080007-73f3-551b-9c26-e8e9ebec19d2"
        ]
    },
    {
        "id": "343a491e-3575-5f01-bd10-fce806418d2d",
        "name": "Pascal Rabaté",
        "bd_ids": [
            "b5c177d6-e429-538f-84b3-6f857b20a7a4"
        ]
    },
    {
        "id": "63d2e556-4c79-555b-afec-1eb4a3f509a5",
        "name": "David Prudhomme",
        "bd_ids": [
            "b5c177d6-e429-538f-84b3-6f857b20a7a4"
        ]
    },
    {
        "id": "eb457afe-c7d7-5465-91f5-1f76bbd153d4",
        "name": "Eddie Campbell",
        "bd_ids": [
            "9491f949-140c-5092-9add-d05dc3983fe1"
        ]
    },
    {
        "id": "aabdfb6d-def7-59e7-aef7-caf4f826425e",
        "name": "Dan Best",
        "bd_ids": [
            "9491f949-140c-5092-9add-d05dc3983fe1"
        ]
    },
    {
        "id": "c31ac25f-8577-51a4-8112-3280350d8f34",
        "name": "Alison Bechdel",
        "bd_ids": [
            "bde8dc28-1f8e-58e9-8de4-8efd46178c54",
            "20219cc1-6639-5762-9325-1f565d5143ce"
        ]
    },
    {
        "id": "f780ae12-bdb3-5934-a7eb-c1a220d6c1f7",
        "name": "Frank Pé",
        "bd_ids": [
            "9ac45906-4b6a-5ca4-805b-f64aec4b90bc"
        ]
    },
    {
        "id": "095fe88f-e6bc-523c-a338-d927d8a46767",
        "name": "Zidrou",
        "bd_ids": [
            "9ac45906-4b6a-5ca4-805b-f64aec4b90bc",
            "5be2ee50-4405-56c2-b59f-fbdc8438e45e",
            "66419695-ae35-53a0-b7db-55e99b5d6b02"
        ]
    },
    {
        "id": "82f0f18e-ef7e-5f41-8047-ad16d91e05e4",
        "name": "Tom Gauld",
        "bd_ids": [
            "c4a296ae-92a4-59dc-9301-4a603a7cffd0",
            "945ced24-f871-580c-a2cd-e55da6520b39"
        ]
    },
    {
        "id": "2f89aaac-ebdd-5a34-a0a8-e93588b567e4",
        "name": "Bryan Talbot",
        "bd_ids": [
            "562e5012-19b0-5794-aa0e-4636a143312f"
        ]
    },
    {
        "id": "74fe19ba-aed1-535a-b8e0-d23ecae07b52",
        "name": "Ibn Al Rabin",
        "bd_ids": [
            "163d1778-437a-5b0b-a41c-477e1740f9d6"
        ]
    },
    {
        "id": "aedca89a-5fbd-5370-bd4f-613e59392e1e",
        "name": "Boris Délevègue",
        "bd_ids": [
            "3ffeb194-5cc8-5d05-ade9-964f5999aa79"
        ]
    },
    {
        "id": "ecc84076-df42-5c48-b1a3-d3d8a57b3771",
        "name": "Pierre Taki",
        "bd_ids": [
            "3dc033eb-0039-59b2-a5c3-2dd8754bcfcc"
        ]
    },
    {
        "id": "bd3ae08f-db85-5ec7-997d-14285b672739",
        "name": "Man Gatarou",
        "bd_ids": [
            "3dc033eb-0039-59b2-a5c3-2dd8754bcfcc"
        ]
    },
    {
        "id": "160a3ea0-3de2-5647-bd35-de0856ad7ff1",
        "name": "Cece Bell",
        "bd_ids": [
            "0d8ca287-8e3d-55a9-9f4f-bbe8a1a62c40"
        ]
    },
    {
        "id": "b84a8b0d-c5d4-50a0-98ca-7499c46b7968",
        "name": "Néjib",
        "bd_ids": [
            "5a7dd53b-1495-5663-bea2-733fedd1d228"
        ]
    },
    {
        "id": "a0e8081c-c789-5249-a9ad-938d911d3d15",
        "name": "Marc-Antoine Mathieu",
        "bd_ids": [
            "4335f95a-162b-55fd-bc33-9ae6270eaa96",
            "9fb8bc86-0c68-5c44-a864-1bd65f4c4114"
        ]
    },
    {
        "id": "5a27bd93-6368-5a71-863e-b2984c27b7da",
        "name": "Javier de Isusi",
        "bd_ids": [
            "09bd361d-294b-548e-81d2-a24ce73e755a"
        ]
    },
    {
        "id": "1cc29f88-7e7f-56ef-b1db-5e3a60803a8b",
        "name": "Mathieu Bablet",
        "bd_ids": [
            "1d56642e-0dc1-5f4a-aae2-0fa94df543fd",
            "f82923f6-8cff-5419-927a-c3db18e9992f"
        ]
    },
    {
        "id": "8fe7fe5d-f5d1-57fa-9b23-8613e9714774",
        "name": "Hugues Micol",
        "bd_ids": [
            "7c7c3feb-134e-5fcd-8be5-c580ee005cb1",
            "9a3852a3-baa8-5f2a-aba2-fe494ac3d2d7"
        ]
    },
    {
        "id": "0afb0661-1df4-536c-9666-10c4b38bb243",
        "name": "Sonny Liew",
        "bd_ids": [
            "d6aa2f0e-42e0-5e88-9aca-0f988aaf0156"
        ]
    },
    {
        "id": "1f5f75e0-7638-50f5-80af-9cd35b1db3a9",
        "name": "Miroslav Sekulic-Struja",
        "bd_ids": [
            "8a70367d-933d-5179-ad05-41d287a8027e"
        ]
    },
    {
        "id": "038c7ffd-f91b-5d74-85b4-4ad2c6c32bf3",
        "name": "Taiyou Matsumoto",
        "bd_ids": [
            "264198c3-9db1-53e1-9cf2-57062511f327",
            "7ecc3faa-7448-57ea-b3c3-3fe72ddd322b"
        ]
    },
    {
        "id": "cdc82420-f432-5f59-a469-f2e496e2ec4d",
        "name": "Chester Brown",
        "bd_ids": [
            "fb7e1f82-d227-5650-85b7-c44a4f634109",
            "1346fd40-465d-50a8-9dbf-1b3db2f2f962"
        ]
    },
    {
        "id": "37c48d00-bc91-517c-b977-e253bcc19204",
        "name": "Luigi Critone",
        "bd_ids": [
            "9915da9c-e3bf-579d-9399-0cca6f6854ed"
        ]
    },
    {
        "id": "d7ebbe2d-e613-5ff8-939b-63886c183c10",
        "name": "Yann Kebbi",
        "bd_ids": [
            "871a5231-dd60-5c65-9b18-723b1565ffa1"
        ]
    },
    {
        "id": "6c202026-ad9b-5d9f-a7cb-35d1e0009667",
        "name": "Viken Berberian",
        "bd_ids": [
            "871a5231-dd60-5c65-9b18-723b1565ffa1"
        ]
    },
    {
        "id": "552512e4-a3e7-5246-89cf-9ddee4ca5e17",
        "name": "Bastien Vivès",
        "bd_ids": [
            "975d271b-e1e0-54f8-9273-2debfe877e0f",
            "6285af41-5732-5e84-907f-7c1c6393c5e5"
        ]
    },
    {
        "id": "38a340c0-3423-5b21-8f83-9db6313b7522",
        "name": "Oriane Lassus",
        "bd_ids": [
            "5a8ed5c1-88a2-5654-88d7-c1d974ade6b3"
        ]
    },
    {
        "id": "befc47ec-c72f-58e3-8519-a28173853443",
        "name": "Michael DeForge",
        "bd_ids": [
            "1446edf4-27ba-5484-9124-b0655c28fa02",
            "2d214a1a-d718-56ca-b4b1-daecd27fbc70"
        ]
    },
    {
        "id": "c49f0cdc-1a16-51f1-aec9-b96dbb3ecfab",
        "name": "Steven Seagle",
        "bd_ids": [
            "5864aefd-c512-5acd-bfd4-654a9577e01f"
        ]
    },
    {
        "id": "f32dd3ed-2196-56e7-bb1a-41d07e59b2f7",
        "name": "Teddy Kristiansen",
        "bd_ids": [
            "5864aefd-c512-5acd-bfd4-654a9577e01f"
        ]
    },
    {
        "id": "bf478f85-abfd-5914-acc2-eb7ae099bad6",
        "name": "Éric Lambé",
        "bd_ids": [
            "2ad5e35b-e8b1-57e4-b566-1e1eb9fdb2aa"
        ]
    },
    {
        "id": "b0f40b74-5f7d-5e03-9420-f2c5732abccf",
        "name": "Philippe de Pierpont",
        "bd_ids": [
            "2ad5e35b-e8b1-57e4-b566-1e1eb9fdb2aa"
        ]
    },
    {
        "id": "c8a55c08-f0a1-57c9-a276-d164183edeb8",
        "name": "Xavier Mussat",
        "bd_ids": [
            "a3a08375-70c5-5185-aa11-1970757201c6"
        ]
    },
    {
        "id": "926f14bf-2ff3-58be-b4a8-bfc69cd4f9fb",
        "name": "Grégoire Bouchard",
        "bd_ids": [
            "506574d1-5d79-5ea8-a30b-2de7549df7f9"
        ]
    },
    {
        "id": "d98bf4ce-fabc-518d-9a7b-415fda62817e",
        "name": "Ludovic Debeurme",
        "bd_ids": [
            "ff441b8a-e7d8-56d6-889a-43edd430e38d"
        ]
    },
    {
        "id": "b52d45f1-1dd3-55f6-bb85-67fcb65cea0b",
        "name": "Matthew Rosenberg",
        "bd_ids": [
            "77b2a2e9-cb9b-5999-9b0a-81ffd06b392c"
        ]
    },
    {
        "id": "e0985a1b-4ff4-5b75-8ca7-3067999c69d5",
        "name": "Patrick Kindlon",
        "bd_ids": [
            "77b2a2e9-cb9b-5999-9b0a-81ffd06b392c"
        ]
    },
    {
        "id": "91ea0576-e99f-559b-8107-43c5a962ce61",
        "name": "Josh hood",
        "bd_ids": [
            "77b2a2e9-cb9b-5999-9b0a-81ffd06b392c"
        ]
    },
    {
        "id": "ef93712c-4767-58cf-bde5-b0d4e4447cc3",
        "name": "Álvaro Ortiz",
        "bd_ids": [
            "83e86609-2b52-52ab-b6f2-454f3f4f1588"
        ]
    },
    {
        "id": "b3477ea0-acf7-5378-921f-003ae0d32b4b",
        "name": "Johnny Ryan",
        "bd_ids": [
            "87fa356f-0b28-50f7-ad0f-7608ec05705e"
        ]
    },
    {
        "id": "035c9f3a-3ce1-5d0c-8ea8-44c33fa53465",
        "name": "Moreau Jérémie",
        "bd_ids": [
            "a968de90-88cc-5e8a-b553-d7298afa9d74"
        ]
    },
    {
        "id": "1cb65ab4-91ec-58a4-b86b-15848303925f",
        "name": "Vero Cazot",
        "bd_ids": [
            "9c926764-7669-5585-8219-0f0fb31f3498"
        ]
    },
    {
        "id": "e8be046b-4ab7-5bf1-b064-43221857647d",
        "name": "Paolo Bacilieri",
        "bd_ids": [
            "920c0bc3-909f-517c-8194-eec53442da3a"
        ]
    },
    {
        "id": "a12a8cd7-361a-5455-a8da-350b55b581b1",
        "name": "Ufficio stampa",
        "bd_ids": [
            "920c0bc3-909f-517c-8194-eec53442da3a"
        ]
    },
    {
        "id": "db9a12ff-381c-54a8-847d-511a1a18e953",
        "name": "Nazario",
        "bd_ids": [
            "765d65d1-e762-5976-bda4-410a49745faf"
        ]
    },
    {
        "id": "685f38e5-4320-5e62-9650-764382aed9a2",
        "name": "Kōhei Horikoshi",
        "bd_ids": [
            "b7cfe93d-0614-51ed-9121-129779a36201"
        ]
    },
    {
        "id": "8c8cfd0d-2ff8-55d1-bf5e-f83410306fb1",
        "name": "Shigeru Mizuki",
        "bd_ids": [
            "42bcdd54-8a27-5fbc-b679-565b1ae82f57",
            "970a07a3-e2a0-5c36-bf0f-9a6f4ea83dad"
        ]
    },
    {
        "id": "081b0e0b-4da2-5f56-bf65-0bd4159a6420",
        "name": "Kieron Gillen",
        "bd_ids": [
            "0ef59048-c3fb-5ea8-b650-75dafe1998cf"
        ]
    },
    {
        "id": "0708b86c-85b5-5300-9cd9-a2bda4f0a606",
        "name": "Jamie McKelvie",
        "bd_ids": [
            "0ef59048-c3fb-5ea8-b650-75dafe1998cf"
        ]
    },
    {
        "id": "a730029a-5fc8-5f2d-83ee-d08a20957c8c",
        "name": "Olivier Schrauwen",
        "bd_ids": [
            "2e7c3a72-b7fc-5260-a119-e8a94af085e5"
        ]
    },
    {
        "id": "df9128c9-cec9-53c8-8729-617042111988",
        "name": "Aude Picault",
        "bd_ids": [
            "06ce7cf3-e238-5bb4-80c8-2000e8c536c7",
            "5664c22b-88d2-5a47-bf61-fb3e4f657a0b",
            "0527534f-2c66-5d92-94d5-e579f45fd919"
        ]
    },
    {
        "id": "be1bbed6-3d2a-5949-9210-263612f09011",
        "name": "Hariton Pushwagner",
        "bd_ids": [
            "37e7a325-c27f-5f10-a2d6-21765d017dd8"
        ]
    },
    {
        "id": "ce395aec-bccb-5983-acf4-6da1f7dc05d3",
        "name": "Ulli Lust",
        "bd_ids": [
            "4bc94c79-035d-558e-85ae-c08e1baee587"
        ]
    },
    {
        "id": "8bf7cd2a-5d3c-56a2-872c-08bd03f0fc87",
        "name": "Fabien Vehlmann",
        "bd_ids": [
            "b8354485-7ce8-5d1c-a71b-bca27475f6c7",
            "6a77cc15-294a-5114-8d5f-73d5d402ab51"
        ]
    },
    {
        "id": "4d8e72d3-3b12-548b-b11e-25da6ce04060",
        "name": "Gwen de Bonneval",
        "bd_ids": [
            "b8354485-7ce8-5d1c-a71b-bca27475f6c7",
            "6a77cc15-294a-5114-8d5f-73d5d402ab51"
        ]
    },
    {
        "id": "2a1ed255-67b2-58cd-b606-8c8dd612fa86",
        "name": "Edith",
        "bd_ids": [
            "5be2ee50-4405-56c2-b59f-fbdc8438e45e"
        ]
    },
    {
        "id": "a296e419-1a8d-59a9-a3cd-d3ee5ba81fc9",
        "name": "Dave McKean",
        "bd_ids": [
            "68213172-a9fb-5a77-9b90-2668f465ed84"
        ]
    },
    {
        "id": "ae96a2ee-5217-5ca6-b422-07d3393e3b41",
        "name": "Chaland",
        "bd_ids": [
            "d7561c34-87ed-5351-9dcd-cabcdda88eb9",
            "a0258b1a-9505-561d-a6a8-ca69479420d8"
        ]
    },
    {
        "id": "289863c6-a5cf-5a8e-ac03-c19aae5a032f",
        "name": "Jean-marc Rochette",
        "bd_ids": [
            "ef41686b-1031-581f-a454-351eef12c49b"
        ]
    },
    {
        "id": "28ec0041-d45e-5c0f-855e-36d755e3a8cc",
        "name": "Adeline Rosenstein",
        "bd_ids": [
            "9b7133ae-5594-5171-a72d-28be9d48ac38"
        ]
    },
    {
        "id": "5867fc24-0362-5151-a5c0-a8846e846594",
        "name": "Mark Millar",
        "bd_ids": [
            "2ab19c62-8468-5b16-99a6-f5b97153b993",
            "9c1164e3-301e-5075-af2f-013c819bb56a"
        ]
    },
    {
        "id": "226380ae-66d4-55d7-bf85-5d57c33b16c8",
        "name": "Ersin Karabulut",
        "bd_ids": [
            "e0f10239-868a-5cde-b6dd-9c94fed8d7b5"
        ]
    },
    {
        "id": "dccf230a-7e53-53fc-8c68-d313d60245f3",
        "name": "Loïc Clément",
        "bd_ids": [
            "4752dff7-0fcb-5360-a636-374577c0b313"
        ]
    },
    {
        "id": "035010a7-3a33-5cdf-b3bc-237e47b1ac05",
        "name": "Clément Lefèvre",
        "bd_ids": [
            "4752dff7-0fcb-5360-a636-374577c0b313"
        ]
    },
    {
        "id": "ed1a4f6d-3f61-5ebf-95d6-dffa1b57b17e",
        "name": "Brian K Vaughan",
        "bd_ids": [
            "0e432312-5b7e-50f8-afba-7869c1256706"
        ]
    },
    {
        "id": "04714650-136f-580a-ba12-2816571f86cf",
        "name": "Pia Guerra",
        "bd_ids": [
            "0e432312-5b7e-50f8-afba-7869c1256706"
        ]
    },
    {
        "id": "eeab9dd3-5b67-53d1-8012-0b2cc71f0442",
        "name": "Jonathan Ames",
        "bd_ids": [
            "8f885326-1105-5c04-9cb9-1df0a0d79080"
        ]
    },
    {
        "id": "44528b19-7eac-5aab-8e73-bbc8f7c11c8b",
        "name": "Dean Haspiel",
        "bd_ids": [
            "8f885326-1105-5c04-9cb9-1df0a0d79080"
        ]
    },
    {
        "id": "1b65525f-ca97-5987-ac69-2799896f5fbf",
        "name": "Charyn",
        "bd_ids": [
            "3d3f33fa-274c-5750-bbe8-b8a37f599031"
        ]
    },
    {
        "id": "012cf8c2-f922-5759-a7c4-244fe42ff33d",
        "name": "Boucq",
        "bd_ids": [
            "3d3f33fa-274c-5750-bbe8-b8a37f599031"
        ]
    },
    {
        "id": "e0661633-2b9b-5f5f-8b1c-9dc7473c5037",
        "name": "Park Kun-Wong",
        "bd_ids": [
            "967b3863-f429-58b5-804c-12a7b22632fd"
        ]
    },
    {
        "id": "8f8828b6-eed2-5ab6-8658-c165aa638119",
        "name": "Remender Rick",
        "bd_ids": [
            "3d1c60ea-55ba-5ab4-a4fb-8b946c6b1c19"
        ]
    },
    {
        "id": "66b3e971-8a48-589a-bb44-75fb4755cf25",
        "name": "Craig Wes",
        "bd_ids": [
            "3d1c60ea-55ba-5ab4-a4fb-8b946c6b1c19"
        ]
    },
    {
        "id": "a4c619ad-7880-5c8f-aeef-ac6c22630f6d",
        "name": "Emil Ferris",
        "bd_ids": [
            "7cb93591-7dde-59e6-9afd-dc565a390435"
        ]
    },
    {
        "id": "f405fdc1-4877-50a2-b054-8198ebc80a55",
        "name": "Yarô Abe",
        "bd_ids": [
            "d0acc909-4425-5267-a65a-41d9ca5be16b"
        ]
    },
    {
        "id": "ef2a5874-3ec2-5b7d-b363-c8c94498ec1a",
        "name": "Nick drnaso",
        "bd_ids": [
            "c5f4a66e-a9f9-530f-8694-d73e0c2f8e4c"
        ]
    },
    {
        "id": "1dd69284-50bc-5d0f-bc2c-f05b6d15d4b3",
        "name": "Bryan Lee O'Malley",
        "bd_ids": [
            "395b6a6b-7acb-5a84-8ddf-e855409977b8",
            "6486c644-9f52-5b81-8121-a07c9ca820d3",
            "24c15eca-cdd6-52e2-ae02-ca99c6a37884"
        ]
    },
    {
        "id": "9e03747d-9a8a-5a37-bef0-6c60c93c5600",
        "name": "Haruko Ichikawa",
        "bd_ids": [
            "0fe6b6ee-7baa-56dc-ab21-40f63a87421b"
        ]
    },
    {
        "id": "c53c562f-90cf-52c7-852e-ba4fa5778897",
        "name": "Anne Simon",
        "bd_ids": [
            "27aa754b-ec29-5d31-aac3-143f9055fdb5"
        ]
    },
    {
        "id": "a353a8e9-4956-50a4-b70d-e0b753fcf522",
        "name": "Régis Loisel",
        "bd_ids": [
            "21bdadd2-bb70-57c4-9fac-bb1eef30acc0"
        ]
    },
    {
        "id": "f7afb30f-e1e2-556c-9c9a-43825f33af8f",
        "name": "Jean-Blaise Djian",
        "bd_ids": [
            "21bdadd2-bb70-57c4-9fac-bb1eef30acc0"
        ]
    },
    {
        "id": "7118c1e0-6a54-5867-b9b0-151ba357e1c8",
        "name": "Vincent Mallié",
        "bd_ids": [
            "21bdadd2-bb70-57c4-9fac-bb1eef30acc0"
        ]
    },
    {
        "id": "34342b16-3119-579b-9c61-ef99940a8224",
        "name": "Thomas Gilbert",
        "bd_ids": [
            "a487bacd-3e60-5db3-9c0f-e8167d21ca9d"
        ]
    },
    {
        "id": "03cdc5ac-b075-5ab7-9fc8-3d64cdf0096d",
        "name": "Hirohiko ARAKI",
        "bd_ids": [
            "7a876a7a-5b64-5cde-9870-ecb1aa6d034c"
        ]
    },
    {
        "id": "a3c116a8-7515-5b5a-808f-6912b470b716",
        "name": "Tom Kaczynski",
        "bd_ids": [
            "6a5e1b8a-0898-5cbd-b53c-ffcb5fb7bb59"
        ]
    },
    {
        "id": "84220ea6-51be-54b2-8524-36bc6a1ad7c5",
        "name": "Nicolás Arispe",
        "bd_ids": [
            "8347cdbe-e853-583d-a6f8-3288b8bb55a5"
        ]
    },
    {
        "id": "2d4623d8-e667-5373-b0e8-0933cc33d64e",
        "name": "Émile Bravo",
        "bd_ids": [
            "c77e8572-a4d7-5a3e-b772-31dd942e9d39"
        ]
    },
    {
        "id": "3b0d46d4-d6dc-5829-b7bf-e74755ca1ff0",
        "name": "Jeff Lemire",
        "bd_ids": [
            "4bb23804-0bcf-59c4-b051-ebf483efde5f",
            "344c953c-2f98-510e-9642-b193cc079eeb"
        ]
    },
    {
        "id": "b4be3d64-8025-58ce-8c65-532412a7a00a",
        "name": "Andrea Sorrentino",
        "bd_ids": [
            "4bb23804-0bcf-59c4-b051-ebf483efde5f"
        ]
    },
    {
        "id": "cc2cbfb1-a137-5c56-8a23-2671597ab919",
        "name": "Peppe Koivunen",
        "bd_ids": [
            "7e408fbd-928f-56ab-b646-d972f5e24698"
        ]
    },
    {
        "id": "0e19ff22-af4d-56a0-abcc-86cb2a09490d",
        "name": "Aapo Rapi",
        "bd_ids": [
            "7e408fbd-928f-56ab-b646-d972f5e24698"
        ]
    },
    {
        "id": "1c483a7c-e6bb-582a-8792-0cc4e649f4d0",
        "name": "Rokudenashiko",
        "bd_ids": [
            "21801dc4-dd74-5bc0-881d-89f0328bcfcf"
        ]
    },
    {
        "id": "458151c8-dc97-5fef-8d61-bef98aaace70",
        "name": "Yuhki Kamatani",
        "bd_ids": [
            "b4e6e54b-c87a-5158-b824-bba62706d262"
        ]
    },
    {
        "id": "28cc0b40-521b-52be-b4d4-a956755eb971",
        "name": "Olivier Texier",
        "bd_ids": [
            "b543747f-1269-5f2c-98d3-13188b27d9b0"
        ]
    },
    {
        "id": "27924509-cf04-5879-b755-b018b8bb79a4",
        "name": "Arnaud Malherbe",
        "bd_ids": [
            "795ed7d3-240b-5db3-8a23-41fe5531f853"
        ]
    },
    {
        "id": "fd980b15-243b-5a7e-98a4-46024c3809b9",
        "name": "Vincent Perriot",
        "bd_ids": [
            "795ed7d3-240b-5db3-8a23-41fe5531f853"
        ]
    },
    {
        "id": "1afe6f24-4e41-56d1-a10e-f3bd77b1e3f5",
        "name": "Gipi",
        "bd_ids": [
            "0a1fa77f-b0ff-55a3-ba65-d274ab0605d3",
            "c36e3da5-0be8-5732-a555-fb7a2b9adc95"
        ]
    },
    {
        "id": "0334ed05-27b2-5dea-b180-3ab2692d85e7",
        "name": "Aniss El Hamouri",
        "bd_ids": [
            "91796292-f679-5dc3-8e16-f53e3cd37480",
            "c7de24d2-2e14-55d4-9ba8-d7999551971b"
        ]
    },
    {
        "id": "37d869e4-02d9-5885-a0c5-62e7f626e80d",
        "name": "Ichikawa Raku",
        "bd_ids": [
            "08e65064-e95c-5215-8c3d-adb674683828"
        ]
    },
    {
        "id": "11ccdb5b-b14e-5297-93a6-144b65c6a374",
        "name": "Venayre",
        "bd_ids": [
            "3d70b2d5-2977-5edc-972d-5f5e66124eef"
        ]
    },
    {
        "id": "0fa6efdf-5b59-5497-a4a0-2412cc8f2249",
        "name": "Davodeau",
        "bd_ids": [
            "3d70b2d5-2977-5edc-972d-5f5e66124eef"
        ]
    },
    {
        "id": "5becded1-8df8-5719-8df7-76a7c8641ec1",
        "name": "Itagaki",
        "bd_ids": [
            "bf4fe76d-85e6-5b2b-8093-bd397f29ccc2"
        ]
    },
    {
        "id": "5210ee98-eddf-5485-bec1-870d0de8270b",
        "name": "Walden",
        "bd_ids": [
            "8ac3624a-93f8-5771-975b-942423b399b5"
        ]
    },
    {
        "id": "5e40aaad-a8ad-59d4-8f7c-0fc6c135a0cd",
        "name": "Pierrick Starsky",
        "bd_ids": [
            "45654738-801a-54ec-a4da-363363691092"
        ]
    },
    {
        "id": "e60fbf0f-6d78-5335-af27-7dca3f46b9b0",
        "name": "Pierre Place",
        "bd_ids": [
            "45654738-801a-54ec-a4da-363363691092"
        ]
    },
    {
        "id": "dfb60faa-598f-5699-8b2f-01a78e66cd35",
        "name": "Jean-Louis Tripp",
        "bd_ids": [
            "20804294-4e09-50cd-94bd-8372e5d99a58"
        ]
    },
    {
        "id": "53e5ed3c-b20d-5b8d-b590-3e185b8a81c5",
        "name": "Daniel Warren Johnson",
        "bd_ids": [
            "85b4afe0-39bc-53e9-b894-84624222cc7d",
            "67a5f9be-05e5-5595-a37f-a5ab7ac9952b"
        ]
    },
    {
        "id": "91077797-d951-5025-a095-fef1a2b3bb5f",
        "name": "Osamu Tezuka",
        "bd_ids": [
            "9a9a15ba-5c4a-5d05-9b95-0f346d811cf6",
            "80e320c2-11e7-595b-89ba-24b81ea6d621"
        ]
    },
    {
        "id": "2e7138da-8cc1-50d9-846f-ea5c74a98cf7",
        "name": "Naoki Yamakawa",
        "bd_ids": [
            "a9faa5b6-9672-510a-bd92-634e3aeb2240"
        ]
    },
    {
        "id": "4c6305bb-724f-5f86-ae00-73e45454b903",
        "name": "Masashi Asaki",
        "bd_ids": [
            "a9faa5b6-9672-510a-bd92-634e3aeb2240"
        ]
    },
    {
        "id": "183f199f-a026-5761-9ec8-c69c66040044",
        "name": "Makoto Yukimura",
        "bd_ids": [
            "4d775666-080c-5f46-ab43-983746584a96"
        ]
    },
    {
        "id": "05eb8f95-5ac9-5a9c-8111-7901bcf3d397",
        "name": "TogaQ",
        "bd_ids": [
            "99f378b2-5ec4-5e8c-9e8d-eec995fc7e71"
        ]
    },
    {
        "id": "019a8caf-92e3-54b4-8add-539931bc8478",
        "name": "Narcissus - Neko Kichiku",
        "bd_ids": [
            "99f378b2-5ec4-5e8c-9e8d-eec995fc7e71"
        ]
    },
    {
        "id": "6b955294-0c6d-5b47-8a7f-7a46611b7aa4",
        "name": "Louise Joor",
        "bd_ids": [
            "e4e1d8bd-5c94-57eb-9b76-45b0d2e3c1b7"
        ]
    },
    {
        "id": "d055575f-870c-5ed6-8371-8ede4af900c1",
        "name": "Emilie Gleason",
        "bd_ids": [
            "0a23fbe5-b7b7-547f-95ef-c8e4c169ba84",
            "22bae3a8-139b-5a3f-932f-80fc901d43af"
        ]
    },
    {
        "id": "77897035-979e-5c77-9015-a3d636adb490",
        "name": "Nina Bunjevac",
        "bd_ids": [
            "8b193f6b-8fc9-5dd4-8f86-3dffe109ace2"
        ]
    },
    {
        "id": "67021253-b3f9-5131-a5a1-6f1e6996c8bd",
        "name": "Tom King",
        "bd_ids": [
            "0eb55165-0714-592e-b967-ca0d76ba06ff",
            "b6e3995c-deef-5246-a9b0-df3a38e0f7e8",
            "980619c8-13ee-54cf-960c-0ad3a452965b"
        ]
    },
    {
        "id": "cd86941a-d2f6-535f-bb9b-ae9e1a277c61",
        "name": "Mitch Gerads",
        "bd_ids": [
            "0eb55165-0714-592e-b967-ca0d76ba06ff",
            "b6e3995c-deef-5246-a9b0-df3a38e0f7e8"
        ]
    },
    {
        "id": "e5020b23-1913-5091-8e95-fb8deb0a3b96",
        "name": "Nine Antico",
        "bd_ids": [
            "455fed83-1d56-56f4-b2e3-46efbcc1f0e1",
            "2f23ec7b-6aa5-5cf5-b8ac-331ee184fe94",
            "a363d9bd-8981-5155-9eb6-c9cef10c231a"
        ]
    },
    {
        "id": "6dc1449e-5778-5046-ae1c-0025d5d15b13",
        "name": "Ai Yazawa",
        "bd_ids": [
            "ea9613e4-c0a1-5a88-b2a4-fc986c9f2240"
        ]
    },
    {
        "id": "63afd855-4f1d-51bb-a5c5-faf4676934bd",
        "name": "Nicolas Jarry",
        "bd_ids": [
            "935c5f25-3edb-5853-91ea-c0c75d211ba5"
        ]
    },
    {
        "id": "731fd7b0-dd35-5c0e-a77b-6d21464732f8",
        "name": "France Richemond",
        "bd_ids": [
            "935c5f25-3edb-5853-91ea-c0c75d211ba5"
        ]
    },
    {
        "id": "7dc8b037-9a91-58d1-8b32-74b2c39834f2",
        "name": "Theo Caneschi",
        "bd_ids": [
            "935c5f25-3edb-5853-91ea-c0c75d211ba5"
        ]
    },
    {
        "id": "4f07590b-71c7-574a-a119-11a46258f06a",
        "name": "Lorenzo Pieri",
        "bd_ids": [
            "935c5f25-3edb-5853-91ea-c0c75d211ba5"
        ]
    },
    {
        "id": "089c60ee-cedc-54f3-9c4d-9414af218b1b",
        "name": "Philippe Valette",
        "bd_ids": [
            "99f43ae7-65c3-5f0b-bd9a-336ad6735fea"
        ]
    },
    {
        "id": "2149320d-2c93-5c48-92dd-fd4a4b4a2916",
        "name": "Goossens",
        "bd_ids": [
            "3d6f3134-2abf-5826-9462-12df423eeb00"
        ]
    },
    {
        "id": "92d63259-a236-5255-8a90-bf9776649674",
        "name": "Chloé Wary",
        "bd_ids": [
            "90a07961-765f-588b-a9b1-147327ff19e6",
            "d535ad5b-baf2-54af-b3d5-17d8b52332ff"
        ]
    },
    {
        "id": "2d4e035b-babd-5524-8a3e-9bcba6e75ec5",
        "name": "Satoshi Kon",
        "bd_ids": [
            "fa63dd8d-c49f-5a56-9f07-8f6fbbb45dbc"
        ]
    },
    {
        "id": "ac8ec002-305d-51dd-96b9-2c2c6d35b9ab",
        "name": "Mike Carey",
        "bd_ids": [
            "91f06cb8-a704-5705-b48a-2015fa0dd6b8"
        ]
    },
    {
        "id": "4622e2be-836f-5c71-a681-8a7b8692853d",
        "name": "Peter Gross",
        "bd_ids": [
            "91f06cb8-a704-5705-b48a-2015fa0dd6b8"
        ]
    },
    {
        "id": "a35e9edb-f6b1-5319-a1b2-1d16cc509e2a",
        "name": "Olivier Coipel",
        "bd_ids": [
            "9c1164e3-301e-5075-af2f-013c819bb56a"
        ]
    },
    {
        "id": "40790dc7-7194-5449-98fe-ccc3f6fa7767",
        "name": "Joe Quesada",
        "bd_ids": [
            "da0ebc32-b9ab-5dbd-a2ef-1ef33fd0c3ea"
        ]
    },
    {
        "id": "2e83f03b-61b3-5559-8c7b-9f91ce6434b7",
        "name": "Christopher Priest",
        "bd_ids": [
            "da0ebc32-b9ab-5dbd-a2ef-1ef33fd0c3ea"
        ]
    },
    {
        "id": "86408786-4e90-52b4-aa67-30066872af26",
        "name": "Azarello",
        "bd_ids": [
            "809c07eb-4cdb-564d-801f-810e13afae93"
        ]
    },
    {
        "id": "fe17f662-7b96-54eb-a378-d165448e83c6",
        "name": "Corben",
        "bd_ids": [
            "809c07eb-4cdb-564d-801f-810e13afae93"
        ]
    },
    {
        "id": "10666593-e9d3-5312-90c8-4ef8d1e3cebe",
        "name": "Ugo Bienvenu",
        "bd_ids": [
            "04614ebb-df6b-5425-9f49-a953190b114f",
            "122a0172-06d1-548d-a796-547d56b7fa4c"
        ]
    },
    {
        "id": "b9adbafa-9486-52d4-bfd9-7072efd368ae",
        "name": "AJ Dungo",
        "bd_ids": [
            "fff5e173-faf5-5091-b143-91036a35047d"
        ]
    },
    {
        "id": "1a7ad751-eef5-54c6-af64-bf354fc1c6bb",
        "name": "Amélie Fléchais",
        "bd_ids": [
            "88083fb1-f033-50a2-a26a-84921246605c"
        ]
    },
    {
        "id": "8ebd502e-0353-5076-9daf-ef5e18c72f6c",
        "name": "Jonathan Garnier",
        "bd_ids": [
            "88083fb1-f033-50a2-a26a-84921246605c"
        ]
    },
    {
        "id": "d16f0632-6f42-5729-a856-4a25f9e5396d",
        "name": "Max",
        "bd_ids": [
            "dcc25ccb-bc58-5f18-9a49-a54fc52fdcf3"
        ]
    },
    {
        "id": "0d6d184b-a29e-53a7-8833-1d8d959e8b67",
        "name": "Tebo",
        "bd_ids": [
            "4e54d086-2092-5623-81ce-cdb52ee354a3"
        ]
    },
    {
        "id": "35a4d2db-5e22-555d-bdcc-c806c0ae5f35",
        "name": "Stéphane Fert",
        "bd_ids": [
            "33368bc9-256a-520a-88cc-b78bd19c6dce",
            "045e3ca9-5744-52bb-ba4c-d69f08e9c343"
        ]
    },
    {
        "id": "101177af-518d-573a-9f37-7d1907f8557a",
        "name": "Bargain Sakurai",
        "bd_ids": [
            "9ea2ba3b-2b4e-5225-9479-85a8b1c8761a"
        ]
    },
    {
        "id": "f95bf41f-d4da-5636-8d31-4a16f45f86ae",
        "name": "Atsuhiko Nakamura",
        "bd_ids": [
            "9ea2ba3b-2b4e-5225-9479-85a8b1c8761a"
        ]
    },
    {
        "id": "79173c52-b077-58b7-9de5-213f60a8f298",
        "name": "Anne-Margot Ramstein",
        "bd_ids": [
            "56fc148f-32d4-5cb2-a0e4-8eee0f478cfb"
        ]
    },
    {
        "id": "21e8c9b3-1fc6-5b3f-9c64-fbc955194792",
        "name": "Nicolas Presl",
        "bd_ids": [
            "5cf79362-fbc8-5768-a71e-da1f3da4979b",
            "0600c708-f469-5a62-87d6-0081966be2b0"
        ]
    },
    {
        "id": "ec7b8039-9647-53bd-98df-c4980ff84587",
        "name": "Ryô Hirano",
        "bd_ids": [
            "99cf5bac-a6b4-5fa0-ace7-3b6acdda880b"
        ]
    },
    {
        "id": "cd9ac32b-5e63-5ee4-a040-0a08d8da008c",
        "name": "Leslie Hung",
        "bd_ids": [
            "6486c644-9f52-5b81-8121-a07c9ca820d3"
        ]
    },
    {
        "id": "5bd9bdce-2827-5048-84b1-476815daaeff",
        "name": "Pauline Giraud",
        "bd_ids": [
            "a07deabb-ba5c-5b23-bd86-e977a8865e6c"
        ]
    },
    {
        "id": "96ee5e02-42ba-5540-b8a7-b2b639a577bb",
        "name": "Maxence Henry",
        "bd_ids": [
            "a07deabb-ba5c-5b23-bd86-e977a8865e6c"
        ]
    },
    {
        "id": "aaff7554-0102-5996-beae-0993b356a202",
        "name": "Yvan Duque",
        "bd_ids": [
            "a07deabb-ba5c-5b23-bd86-e977a8865e6c"
        ]
    },
    {
        "id": "95d147eb-c140-5339-ad8e-0d09bd1bb49f",
        "name": "Alfred",
        "bd_ids": [
            "3852be01-9880-52eb-8493-9b3a5758e58f"
        ]
    },
    {
        "id": "643adc5f-050b-514f-855f-2ff87a990c08",
        "name": "Mark Waid",
        "bd_ids": [
            "7769da5e-26ce-5da9-bec0-7a649cbadc21",
            "1c16dd39-9b71-570b-adf9-dd949b0876ed"
        ]
    },
    {
        "id": "cf7a99fa-a50c-569b-b9bd-f5e5c1769357",
        "name": "Alex Ross",
        "bd_ids": [
            "7769da5e-26ce-5da9-bec0-7a649cbadc21"
        ]
    },
    {
        "id": "c3a1940c-7540-5034-8b6c-ca60b59520b3",
        "name": "Riichiro Inagaki",
        "bd_ids": [
            "e897052f-d4f2-5e42-9731-c4f7b672d891"
        ]
    },
    {
        "id": "68134aa4-2f64-5303-a042-788e170ddea9",
        "name": "Boichi",
        "bd_ids": [
            "e897052f-d4f2-5e42-9731-c4f7b672d891"
        ]
    },
    {
        "id": "a367fe72-04a8-59a8-955b-882054715ed1",
        "name": "Ville Ranta",
        "bd_ids": [
            "a5c2edd4-0e57-5aff-ad51-1da715ae3f5e"
        ]
    },
    {
        "id": "7dcf6112-1145-5af4-82fb-e9b92015aa1d",
        "name": "Moa Romanova",
        "bd_ids": [
            "126597e8-c9b9-59ea-bd95-81b0e7b61342"
        ]
    },
    {
        "id": "ecb145e1-13b8-59fa-8422-1fbb2a505946",
        "name": "Marguerite Abouet",
        "bd_ids": [
            "f85336b5-f4df-5112-a405-cf0dbd14fd50"
        ]
    },
    {
        "id": "aadfc208-0268-5ff7-b840-57b854a09cce",
        "name": "Donatien Mary",
        "bd_ids": [
            "f85336b5-f4df-5112-a405-cf0dbd14fd50"
        ]
    },
    {
        "id": "beb683f9-838a-5ab5-915e-50e5ee57e66f",
        "name": "Noëlle Steveson",
        "bd_ids": [
            "531a885c-829a-59e3-9ce8-4af27ee228e2"
        ]
    },
    {
        "id": "a6b81f1d-dc27-5aa3-877e-d3e6bd44907d",
        "name": "Kelly Sue DeConnick",
        "bd_ids": [
            "ef0b7e38-3627-5f6e-b460-3e92a56d3a13"
        ]
    },
    {
        "id": "e00c6e9a-cecb-5393-9a29-204cb3947ce9",
        "name": "Emma Ríos",
        "bd_ids": [
            "ef0b7e38-3627-5f6e-b460-3e92a56d3a13"
        ]
    },
    {
        "id": "e02ab7f1-a215-5b6d-a012-ed8916473101",
        "name": "Theo Ellsworth",
        "bd_ids": [
            "12865e73-340e-5385-a1c0-8dcd99f6ad82"
        ]
    },
    {
        "id": "635f02aa-96a4-5530-bbea-013c415c8290",
        "name": "Vincent Zabus",
        "bd_ids": [
            "58bf1586-0770-5e05-9d5e-84b033947d1f"
        ]
    },
    {
        "id": "09a3b727-757e-5f3a-84f0-75b4364f9c63",
        "name": "Hippolyte",
        "bd_ids": [
            "58bf1586-0770-5e05-9d5e-84b033947d1f"
        ]
    },
    {
        "id": "a98cd576-0496-5016-8738-c111b1250f68",
        "name": "Claude Lacroix",
        "bd_ids": [
            "9f71560e-9697-518d-a092-a2e73ca2c608"
        ]
    },
    {
        "id": "85773f9c-27a8-5d21-9786-fad52ff3180e",
        "name": "François Bourgeon",
        "bd_ids": [
            "9f71560e-9697-518d-a092-a2e73ca2c608"
        ]
    },
    {
        "id": "4a7a4f1c-41b7-5fc8-920d-ac55b12d15d1",
        "name": "Kat Leyh",
        "bd_ids": [
            "7655deef-be68-561d-a942-3a401c24343e"
        ]
    },
    {
        "id": "f6acf67b-3605-510c-89f9-da99c5668419",
        "name": "Jacky Benetaud",
        "bd_ids": [
            "2a776a76-0486-5fa8-a693-0507a23edda8"
        ]
    },
    {
        "id": "588613c4-6e68-5359-ada6-29b7ff634885",
        "name": "Fabrizio Dori",
        "bd_ids": [
            "2a776a76-0486-5fa8-a693-0507a23edda8",
            "8faa03ae-f8f4-5b68-9059-c0c628f85707"
        ]
    },
    {
        "id": "fd8a5c80-b148-5a48-a880-d38d2e74bf5a",
        "name": "Komoto Hajime",
        "bd_ids": [
            "2a5e1c5f-476c-5d4e-81f3-2b78cb856e41"
        ]
    },
    {
        "id": "a257ccd6-592f-5169-9247-729f4a009e2d",
        "name": "Akiko Higashimura",
        "bd_ids": [
            "473edb56-8483-5f87-ae9a-226e5639da7c"
        ]
    },
    {
        "id": "11132b63-24cf-5e0c-87e3-f82a28ac89e8",
        "name": "James Tynion IV",
        "bd_ids": [
            "d8f9a56b-3061-5c16-9cce-1d231de67319",
            "df990528-33c4-5c15-87e0-ad4119be24f3"
        ]
    },
    {
        "id": "11b97ae6-9bb9-56c9-914a-c8e0fe79156c",
        "name": "Werther Dell'Edera",
        "bd_ids": [
            "d8f9a56b-3061-5c16-9cce-1d231de67319"
        ]
    },
    {
        "id": "2bd1623e-7f3d-543a-b05c-628bb3e6d6b4",
        "name": "Suehiro Maruo",
        "bd_ids": [
            "cd0cdc46-bfd4-5850-beaf-3019f10e3e7b"
        ]
    },
    {
        "id": "56030257-e26e-53d8-9d62-6471ba32ecce",
        "name": "Zeina Abiracheb",
        "bd_ids": [
            "1a3f1d17-bebd-5ddb-abe3-9533675f24a8"
        ]
    },
    {
        "id": "581a5d0a-41d0-54b0-8ccb-9f5dac37c4e3",
        "name": "collectif",
        "bd_ids": [
            "609fe001-1408-54fc-8686-1a7094aaa0da"
        ]
    },
    {
        "id": "23c4dbf2-da76-5959-b5c8-de2b87f8dc74",
        "name": "Baru",
        "bd_ids": [
            "493aa385-71e1-5b94-937d-fc270fd2d7bc"
        ]
    },
    {
        "id": "8c05c235-5085-5da5-975c-95a3ec03a0ce",
        "name": "Lucrèce Andreae",
        "bd_ids": [
            "209120cd-8ef2-5051-9030-5750844215c5"
        ]
    },
    {
        "id": "f1c41fdd-a85b-58e1-b10d-1c31f9803326",
        "name": "Lukasz Wojciechowski",
        "bd_ids": [
            "00b764c7-9e57-5a44-8922-76ffc6c0c006"
        ]
    },
    {
        "id": "06ae0839-7b89-5d3a-bf83-99dc6830803a",
        "name": "Simon Hanselmann",
        "bd_ids": [
            "385f1264-4b26-5572-b2a8-10343d26cc7c"
        ]
    },
    {
        "id": "eb5d6e96-6e8e-5188-8ea6-58cc19c59957",
        "name": "Geoffroy Monde",
        "bd_ids": [
            "2f0d945f-bd63-5967-9a57-844e20b11675"
        ]
    },
    {
        "id": "7116930d-8c4e-548c-b9e6-248dafce1360",
        "name": "Wilfrid Lupano",
        "bd_ids": [
            "045e3ca9-5744-52bb-ba4c-d69f08e9c343"
        ]
    },
    {
        "id": "141dc09a-4241-51b4-a81e-5402d1647f96",
        "name": "Philippe Druillet",
        "bd_ids": [
            "98a1d8c6-853d-5970-b117-ace76d927b91"
        ]
    },
    {
        "id": "b6ec5ccc-d0ec-5f4f-971f-7e1f961f15f1",
        "name": "Jun Mayuzuli",
        "bd_ids": [
            "45a36e4f-7780-53c1-b774-353b3aa6e85e"
        ]
    },
    {
        "id": "831f7cc9-9ad6-5358-8ca1-1d671a6cb6f1",
        "name": "Fabcaro",
        "bd_ids": [
            "be84548c-9e26-56ea-a97d-bdf4b9653250"
        ]
    },
    {
        "id": "a1b4ee86-d88a-5c9f-a04e-fb542537c0f0",
        "name": "Léonie Bischoff",
        "bd_ids": [
            "04c7c967-43b9-5255-a016-a6a6713ccaf0"
        ]
    },
    {
        "id": "566e776d-c9d5-52e2-8388-6dad7d49b424",
        "name": "Brad Metzler",
        "bd_ids": [
            "808def66-0261-5fb0-adf1-2e8c3f8761d8"
        ]
    },
    {
        "id": "b922cef3-2fc8-568f-a16c-87f17c81465e",
        "name": "Rags Morales",
        "bd_ids": [
            "808def66-0261-5fb0-adf1-2e8c3f8761d8"
        ]
    },
    {
        "id": "3f2d648d-6795-56c7-a81a-4a98b852b1a0",
        "name": "Josselin Facon",
        "bd_ids": [
            "122a0172-06d1-548d-a796-547d56b7fa4c"
        ]
    },
    {
        "id": "9d6057a1-8a84-5712-9f8c-4f2e530b2f34",
        "name": "Arleston",
        "bd_ids": [
            "e37157f2-efbb-508a-bc47-17a90bc02c84"
        ]
    },
    {
        "id": "5b576627-0b89-5180-bd78-cb87eb672cd0",
        "name": "Tarquin",
        "bd_ids": [
            "e37157f2-efbb-508a-bc47-17a90bc02c84"
        ]
    },
    {
        "id": "0f40eecd-24cf-5c5c-8330-f71cda6d02c3",
        "name": "José Parrondo",
        "bd_ids": [
            "ad666457-dc66-5f79-a8e2-24d71257ce29"
        ]
    },
    {
        "id": "cd5b8826-38e8-5380-86f3-a2d6735d723a",
        "name": "Rey",
        "bd_ids": [
            "deb20c8e-015a-5c9c-9686-1111263e8a0a"
        ]
    },
    {
        "id": "1f55bd80-400f-5c7c-98ed-d29a9fff6cbe",
        "name": "Galic",
        "bd_ids": [
            "deb20c8e-015a-5c9c-9686-1111263e8a0a"
        ]
    },
    {
        "id": "030b9850-5805-5d5d-b8ef-9d9d2f42cdd6",
        "name": "Kris",
        "bd_ids": [
            "deb20c8e-015a-5c9c-9686-1111263e8a0a"
        ]
    },
    {
        "id": "b791b4d4-8740-554d-ad07-82218d8bb7ed",
        "name": "Bonnet",
        "bd_ids": [
            "deb20c8e-015a-5c9c-9686-1111263e8a0a"
        ]
    },
    {
        "id": "604f3749-8f3e-5862-a9e5-04fa037f26c0",
        "name": "Hill",
        "bd_ids": [
            "95b4b543-ca5b-5c52-a9a8-ee27b4ebe32b"
        ]
    },
    {
        "id": "38ca6247-1af6-574c-b8c6-2ce51282d966",
        "name": "Rodriguez",
        "bd_ids": [
            "95b4b543-ca5b-5c52-a9a8-ee27b4ebe32b"
        ]
    },
    {
        "id": "faf147b2-0071-53bc-bd91-a89be82a3bde",
        "name": "Marcello Quintanilha",
        "bd_ids": [
            "0e8111d0-2e90-54c7-88b1-43b0e0881cc9"
        ]
    },
    {
        "id": "c5b9e189-2937-5717-9cfa-4bf3ca95975e",
        "name": "Michel Fiffe",
        "bd_ids": [
            "ed1239f8-6705-59cc-89fa-0f58a386644e"
        ]
    },
    {
        "id": "eae3e547-17c4-5a9d-9f08-a099870e7427",
        "name": "Keito Gaku",
        "bd_ids": [
            "259a0454-9500-5b1b-be3c-1039abe5838a"
        ]
    },
    {
        "id": "1e2535bc-1306-5edf-a096-6619d1fc69f0",
        "name": "Fabrice Neaud",
        "bd_ids": [
            "5b09fc60-7852-5dd7-85fd-47d06d44ac08"
        ]
    },
    {
        "id": "517fda5b-0d2f-5cb9-a689-38ded1fc1732",
        "name": "Manon Desveaux",
        "bd_ids": [
            "5792de8a-229c-5f32-9cd0-3d9421f85b62"
        ]
    },
    {
        "id": "f98adb03-4782-5e7d-858c-cea66c569d0a",
        "name": "Lou Lubie",
        "bd_ids": [
            "5792de8a-229c-5f32-9cd0-3d9421f85b62"
        ]
    },
    {
        "id": "4102d5a8-722f-5280-a290-ccc976747c79",
        "name": "Burckel",
        "bd_ids": [
            "d77af3ef-1018-580f-8b4b-bdac6993c4b9"
        ]
    },
    {
        "id": "a0ad17df-cc7c-5579-a3f6-7fea6f6b69f5",
        "name": "Hubert",
        "bd_ids": [
            "d77af3ef-1018-580f-8b4b-bdac6993c4b9"
        ]
    },
    {
        "id": "002b8b8f-eaec-50aa-b1a9-dd32ff43ef58",
        "name": "Emma CakeCup",
        "bd_ids": [
            "081abfa6-a3db-5c8b-ac64-f2ef4e0beb4d"
        ]
    },
    {
        "id": "c6c2e2e5-de20-5485-a998-76541abafe3e",
        "name": "Pauline Roland",
        "bd_ids": [
            "081abfa6-a3db-5c8b-ac64-f2ef4e0beb4d"
        ]
    },
    {
        "id": "3ecb51cb-7330-5551-b059-2bc07bbe2220",
        "name": "Karim Mahfouf",
        "bd_ids": [
            "93c55d49-da91-53a8-9384-a9e74f86fe92"
        ]
    },
    {
        "id": "9ebb375a-570f-5d10-af89-e2581554813f",
        "name": "Squeezie 7 Guillaume Natas",
        "bd_ids": [
            "81d0933e-90f7-5b74-b9fb-ba27cc47fa12"
        ]
    },
    {
        "id": "67a61400-02a1-5e8a-815f-efe1aaff4044",
        "name": "Karensac",
        "bd_ids": [
            "81d0933e-90f7-5b74-b9fb-ba27cc47fa12"
        ]
    },
    {
        "id": "740a55f0-b066-529c-aad3-be7706f65d0c",
        "name": "Cyprien",
        "bd_ids": [
            "bb95f1ee-35e4-5172-bcf9-11aa19d39885"
        ]
    },
    {
        "id": "728ca873-d312-575d-b216-7d2f31953628",
        "name": "Paka",
        "bd_ids": [
            "bb95f1ee-35e4-5172-bcf9-11aa19d39885"
        ]
    },
    {
        "id": "4262dd32-264e-5b27-89d4-b8f1d948b32c",
        "name": "Lob",
        "bd_ids": [
            "219fdb59-446f-5ec8-ada8-aa3432778341"
        ]
    },
    {
        "id": "acaa9413-e232-5de0-95fa-e139a9ece44f",
        "name": "Rochette",
        "bd_ids": [
            "219fdb59-446f-5ec8-ada8-aa3432778341"
        ]
    },
    {
        "id": "5d4b528a-9838-5b47-9940-6c3506237d97",
        "name": "Legrand",
        "bd_ids": [
            "219fdb59-446f-5ec8-ada8-aa3432778341"
        ]
    },
    {
        "id": "1a18f2fb-0d2c-54c5-a763-fdadef46f041",
        "name": "Gustave Doré",
        "bd_ids": [
            "7e0fbd51-70be-5b79-b9fd-fdcbdbe6784d"
        ]
    },
    {
        "id": "c86e250b-e9c3-59aa-869a-9ab8b53022f1",
        "name": "Franquin",
        "bd_ids": [
            "fbb83c90-bc31-53bb-82f1-62a4921b7b66"
        ]
    },
    {
        "id": "f42b2254-0bb6-589f-b754-788623bc0690",
        "name": "Aurélia Aurita",
        "bd_ids": [
            "aa142d80-6e53-53cf-ad01-13c8af2060cf",
            "6f40ce09-c1fc-56c3-b191-aaef5f620982"
        ]
    },
    {
        "id": "70125cb3-0e45-5bc9-9aef-4cbb67edb051",
        "name": "Peeters",
        "bd_ids": [
            "621f773d-d0aa-5e22-bf81-c530967a1fbe"
        ]
    },
    {
        "id": "d665cfb4-c5db-586a-ad00-d7483be1868f",
        "name": "Wazem",
        "bd_ids": [
            "621f773d-d0aa-5e22-bf81-c530967a1fbe"
        ]
    },
    {
        "id": "088ef0e0-f6d5-5b0b-8bbe-34adf8a69a86",
        "name": "Matt Kindt",
        "bd_ids": [
            "8b049e1b-5908-5c4b-972e-d34e04c6ab0c"
        ]
    },
    {
        "id": "55a709af-cd36-5f34-9454-177b62ab1b72",
        "name": "Xavier Bouyssou",
        "bd_ids": [
            "a88d2dfe-e823-5455-b5a7-a9eea7604db2"
        ]
    },
    {
        "id": "6c618371-acaa-57cf-916f-31d5288f8285",
        "name": "Léa Murawiec",
        "bd_ids": [
            "7c33cd89-18a5-55ee-a927-d33a3b91a4d4"
        ]
    },
    {
        "id": "0d7a1f2e-614f-5f9b-9eb0-e977c4413fbc",
        "name": "Yukinobu Tatsu",
        "bd_ids": [
            "8e76ff82-caba-5256-b56f-36fdcc09b8cc"
        ]
    },
    {
        "id": "0cc64c64-f713-57ca-a315-70087758c502",
        "name": "Benoit Peeters",
        "bd_ids": [
            "6f40ce09-c1fc-56c3-b191-aaef5f620982"
        ]
    },
    {
        "id": "9a3c0069-aa3f-5826-9ef1-9f344244d3dc",
        "name": "Elisa Marraudino",
        "bd_ids": [
            "e316844c-27bd-5037-a0f8-1327a62e748f"
        ]
    },
    {
        "id": "4eee69a6-88fd-5e48-b8f5-dd582920a450",
        "name": "Ram V",
        "bd_ids": [
            "92d5d028-df2f-5e50-b4b7-9887ae2f807b"
        ]
    },
    {
        "id": "94b0e949-b89d-5ea5-b0b9-7cbd0ac73da4",
        "name": "Filipe Andrade",
        "bd_ids": [
            "92d5d028-df2f-5e50-b4b7-9887ae2f807b"
        ]
    },
    {
        "id": "48aace14-0b8f-5dc9-aee0-2b52c883a081",
        "name": "Daria Schmidtt",
        "bd_ids": [
            "f6c7005e-7b64-5eef-844a-2ac4acdc1b07"
        ]
    },
    {
        "id": "6ada2d73-1f4e-5954-8c72-bc0404fa4307",
        "name": "Lucie Lomova",
        "bd_ids": [
            "406eb059-e7e8-54f1-8f89-cddea6c629e0"
        ]
    },
    {
        "id": "f88b6be4-be83-553a-9a10-0c3ff88d9c71",
        "name": "Edgar P. Jacobs",
        "bd_ids": [
            "f865a993-10dd-5daf-9303-db5328540034"
        ]
    },
    {
        "id": "ec3adb15-c596-5229-b64a-d324f9941ab6",
        "name": "Lucas Varela",
        "bd_ids": [
            "ec050548-66da-5642-af27-79ee4e0f5571"
        ]
    },
    {
        "id": "901b17fe-09a8-5b9f-9f5d-a73d92a26547",
        "name": "Aude Mermilliod",
        "bd_ids": [
            "01c74bc6-960a-58b3-9069-ca12ec2fb9b4"
        ]
    },
    {
        "id": "c75bf8ef-b761-59b7-aa36-7db51b472618",
        "name": "Blutch",
        "bd_ids": [
            "e00d76ed-0c5c-5fcb-b972-355c57612e91"
        ]
    },
    {
        "id": "2822bd0a-4242-59a8-a4dd-2a9d553c94f0",
        "name": "Poulie",
        "bd_ids": [
            "b86b53b5-7121-5fae-8ed9-50fc48076812"
        ]
    },
    {
        "id": "7036c4fd-e408-5618-af2e-9baaff128651",
        "name": "Keigo Shinzo",
        "bd_ids": [
            "4926fa87-8fac-59ea-b462-beaa8865b399"
        ]
    },
    {
        "id": "54bfd2ce-3cf6-5269-8baa-e3571399f282",
        "name": "tienstiens",
        "bd_ids": [
            "904c9d20-f81a-591d-b110-2e457f6d8f60"
        ]
    },
    {
        "id": "3614d1a7-ee71-5831-acc7-36feb510177c",
        "name": "Paul Dini",
        "bd_ids": [
            "e2d4bc7b-ec4b-5fb3-880e-e94f5c8c0eaa"
        ]
    },
    {
        "id": "8f0a123e-a29e-5620-989c-8b6e9bc9f3de",
        "name": "Eduardo Risso",
        "bd_ids": [
            "e2d4bc7b-ec4b-5fb3-880e-e94f5c8c0eaa"
        ]
    },
    {
        "id": "d7afa3d1-9cbc-5630-9a1e-36550ba2ae00",
        "name": "Terry Moore",
        "bd_ids": [
            "47a951d2-d847-566a-9180-6dad63037708"
        ]
    },
    {
        "id": "81eb6653-4aac-5e37-b82d-5e6552f5669a",
        "name": "Etienne Davodeau",
        "bd_ids": [
            "f2ece642-d63f-5322-8208-0d755268b0a7"
        ]
    },
    {
        "id": "10a532a2-fbf4-5e12-af99-152a45092deb",
        "name": "Juan Giménez",
        "bd_ids": [
            "b94bc845-eb86-5631-9fb8-fcaf3f1b0ed5"
        ]
    },
    {
        "id": "5687b7c6-fc2f-5234-8443-9dccba2dbe03",
        "name": "Kentarō Miura",
        "bd_ids": [
            "233df3dc-5aec-5505-b208-b7dad00c99b1"
        ]
    },
    {
        "id": "fd5a8b65-5f73-54a0-a57e-54dfea8abc8c",
        "name": "Winshluss",
        "bd_ids": [
            "903acafa-4e30-5dcb-85ec-e2d1ce52d741"
        ]
    },
    {
        "id": "e5d3b413-fc6e-5914-a5e2-4cca6c66a3b4",
        "name": "Kenji",
        "bd_ids": [
            "d7d58ce0-3034-5dc1-ad26-f2ba302c0559"
        ]
    },
    {
        "id": "a613ac87-f316-5eb1-a41b-c629d3975868",
        "name": "Tsunehiro",
        "bd_ids": [
            "d7d58ce0-3034-5dc1-ad26-f2ba302c0559"
        ]
    },
    {
        "id": "1f638d4e-04ec-5db9-840e-ac7e034bf933",
        "name": "Lee Lai",
        "bd_ids": [
            "73418c95-df6c-50b9-8713-0cd6437ca1e8"
        ]
    },
    {
        "id": "f8f3e6c7-7f1c-5fa4-95b3-e5943256b388",
        "name": "les soeurs Wachowski",
        "bd_ids": [
            "32c39747-541d-55b3-b217-835c9e26ffdb"
        ]
    },
    {
        "id": "cb340fda-dc8b-599c-9ba4-114eff1ad741",
        "name": "Skroce",
        "bd_ids": [
            "32c39747-541d-55b3-b217-835c9e26ffdb"
        ]
    },
    {
        "id": "35cf1a17-190f-5618-a7fe-4554e75983f4",
        "name": "Jordi Lafebre",
        "bd_ids": [
            "12d42d70-3a3c-5d61-bf59-ac8cc63ba0a5"
        ]
    },
    {
        "id": "bc5f45bb-b47a-5c9e-9452-990ca3ac5f9a",
        "name": "Jérémy Bastian",
        "bd_ids": [
            "28c74fd2-511a-5728-a28e-8876fa62ece8"
        ]
    },
    {
        "id": "591a05fd-7b21-55d5-bd3a-0214e741d120",
        "name": "Neyef",
        "bd_ids": [
            "5ce81c2c-23ca-5bfe-899a-011a2c38e9e0"
        ]
    },
    {
        "id": "b64f17a8-7cde-5016-a0ba-5e4599ad52f2",
        "name": "Judith Vanistendael",
        "bd_ids": [
            "66419695-ae35-53a0-b7db-55e99b5d6b02"
        ]
    },
    {
        "id": "12d81cb8-0977-5c8d-95e1-546f5eddf90d",
        "name": "Paul Kirchner",
        "bd_ids": [
            "f276e705-9146-5580-823a-15d8c2591660"
        ]
    },
    {
        "id": "3147fff6-a2e8-5fc8-8085-78440711c1b3",
        "name": "Maran Hrachyan",
        "bd_ids": [
            "714b0f37-f73f-5508-825c-281074c8aebe"
        ]
    },
    {
        "id": "96909ed8-afbc-51b4-828e-cf484c613c2d",
        "name": "Naoki Urasawa",
        "bd_ids": [
            "c63fb7f3-28e9-51b0-a879-a22cae604ae9",
            "af92af68-880b-54ec-9b11-b63ac826149b"
        ]
    },
    {
        "id": "24f5b427-235c-5460-9de0-85f11a01139a",
        "name": "Anouk Ricard",
        "bd_ids": [
            "76da166c-6887-58fe-839c-5ceb1d79b8ee"
        ]
    },
    {
        "id": "3b40ac72-a75f-5c79-bd75-a460f955ae58",
        "name": "Pierre Ferrero",
        "bd_ids": [
            "4fe38dd6-5f77-5f47-8a7d-4a869f44334a"
        ]
    },
    {
        "id": "671a3790-6703-5f60-93f7-4c8096394838",
        "name": "Merwan",
        "bd_ids": [
            "ca07d9e7-2615-5857-8ff2-c8a481345db9"
        ]
    },
    {
        "id": "86f3e63b-c414-594e-af58-abfb190ddea2",
        "name": "Aisha Franz",
        "bd_ids": [
            "f9700842-783a-547b-b038-f388c81263c4"
        ]
    },
    {
        "id": "7a222e55-c2c0-5fff-acc7-4a9c36238f5f",
        "name": "Atsushi Kaneko",
        "bd_ids": [
            "e7880ee2-b182-5a13-8a84-f3877bd0a932"
        ]
    },
    {
        "id": "2c1293b1-0b71-5d73-9217-34bf2c597b62",
        "name": "Baladi",
        "bd_ids": [
            "677a0a0d-9f0e-5524-892e-5feeda95fa37"
        ]
    },
    {
        "id": "41d4d07a-dd5b-575e-8575-182029f2ffbc",
        "name": "Smith",
        "bd_ids": [
            "5ee6ce29-7b61-53b4-8994-a0a2e783cf92"
        ]
    },
    {
        "id": "b28aa578-42b6-53f0-ba2e-0e91a837d1cc",
        "name": "Klou",
        "bd_ids": [
            "af4e1bb1-ecf0-5912-8197-9d9e0b210b72"
        ]
    },
    {
        "id": "2c5d1ecf-6832-57d5-b546-c500ad06204d",
        "name": "Fred",
        "bd_ids": [
            "fc30f32a-3e20-5385-b28a-7439ee532389"
        ]
    },
    {
        "id": "61d33246-60ce-54a8-9d34-3b08a03ebd0a",
        "name": "Bea Lema",
        "bd_ids": [
            "aa01d166-f99b-5537-9d2f-99f433ffdc97"
        ]
    },
    {
        "id": "0609ba11-9dd6-51a2-a1fa-5945569f3a15",
        "name": "Renaud Roche",
        "bd_ids": [
            "fc62fcaa-84ef-5a91-a79d-34ee62b436ef"
        ]
    },
    {
        "id": "2b7ad5e3-6b65-5786-bd5f-d02f8bcdde29",
        "name": "Laurent Hopman",
        "bd_ids": [
            "fc62fcaa-84ef-5a91-a79d-34ee62b436ef"
        ]
    },
    {
        "id": "57a7df47-868e-598d-8320-562a491eec09",
        "name": "Jemisin",
        "bd_ids": [
            "8a50365e-9da9-59dd-bc97-969ed43c22c7"
        ]
    },
    {
        "id": "29e81ba3-c9a8-5437-a577-2324e84c2a22",
        "name": "Campbell",
        "bd_ids": [
            "8a50365e-9da9-59dd-bc97-969ed43c22c7"
        ]
    },
    {
        "id": "c9b6be22-065c-5547-a9aa-9db3a027d1e6",
        "name": "Balboa",
        "bd_ids": [
            "515abf3f-be71-5dc5-a79a-662cd25fccf6"
        ]
    },
    {
        "id": "c8a7e06b-5246-59d8-988d-2f1dfc3dcbe7",
        "name": "Arakawa",
        "bd_ids": [
            "0c7c6682-3287-56d0-a8d6-82aea0648529"
        ]
    },
    {
        "id": "0399b1c8-5e87-58d3-8ea8-63453280e3bb",
        "name": "Heugel",
        "bd_ids": [
            "debf7682-e9ad-587d-a814-efdeaad2c9e7"
        ]
    },
    {
        "id": "83cd0cff-b455-5d5f-b0d2-1620f35ecd54",
        "name": "Consigny",
        "bd_ids": [
            "debf7682-e9ad-587d-a814-efdeaad2c9e7"
        ]
    },
    {
        "id": "5c77edf3-4fb1-52ab-ab5c-229c1eb836e8",
        "name": "Saiki Kumiko",
        "bd_ids": [
            "e2102e41-2abb-59a4-b7fe-8d4ecc23e1da"
        ]
    },
    {
        "id": "eb085332-9b22-53f0-a527-1e929572ab5a",
        "name": "Brubaker",
        "bd_ids": [
            "956b5864-d695-5e4f-b6f3-48078e019fe0"
        ]
    },
    {
        "id": "00db3447-5ed5-5ba8-a2af-2dd9199c5602",
        "name": "Ruka",
        "bd_ids": [
            "956b5864-d695-5e4f-b6f3-48078e019fe0"
        ]
    },
    {
        "id": "969606f1-a82b-5683-8a38-a91089eb9598",
        "name": "Clamp",
        "bd_ids": [
            "ab707df2-5f9e-5bce-ba06-da7fc0e88bfd"
        ]
    },
    {
        "id": "f00e5d5f-7bc4-58c0-98a0-7c48ff1b2ead",
        "name": "Forest",
        "bd_ids": [
            "bde7b6df-1144-56af-8a15-03f3710adb93"
        ]
    },
    {
        "id": "8519e2d5-a656-5ce0-9642-74f939ba1e60",
        "name": "Tardi",
        "bd_ids": [
            "bde7b6df-1144-56af-8a15-03f3710adb93"
        ]
    },
    {
        "id": "e1d64487-9066-57a4-a82b-f95b1f11a41f",
        "name": "Hannah Templer",
        "bd_ids": [
            "52b5768f-92ea-5ea0-864c-f91c838da16c"
        ]
    },
    {
        "id": "cc4653dc-b615-54e5-bac1-c35dc48d1341",
        "name": "Elene Usdin",
        "bd_ids": [
            "13a95766-1ae7-52fc-8158-e51115b8fa4a"
        ]
    },
    {
        "id": "5a3e0ea6-adbe-572e-9cdf-9074ad4b7dcf",
        "name": "ND Stevenson",
        "bd_ids": []
    },
    {
        "id": "e91e7e71-ed2e-5acb-a42e-2ad624b8ab41",
        "name": "Mana Neyestani",
        "bd_ids": [
            "1ed863f9-5aea-574a-8e7a-8a8f061235e5"
        ]
    },
    {
        "id": "2d932312-b0bc-5bac-9c2d-dfe07ecede95",
        "name": "Ikue Aizawa",
        "bd_ids": [
            "48a7b58b-aa17-5b0d-98ec-fe8a997395c0"
        ]
    },
    {
        "id": "60d5489b-14e3-518b-9109-e042747d08ff",
        "name": "Stepan Sejic",
        "bd_ids": [
            "b089120d-7f10-5457-96b1-b233822e6f5e"
        ]
    },
    {
        "id": "98f266c0-cb80-5d14-8e5c-697e49b48751",
        "name": "Edith Chambon",
        "bd_ids": [
            "330732a9-e0e1-5cf1-a00d-ecd08a2bc222"
        ]
    },
    {
        "id": "45d6dbf8-fbd9-578b-9e9f-8402dc2d31e7",
        "name": "Moto Hagio",
        "bd_ids": [
            "d0773c0e-efce-5e3f-b88c-b401e6925875"
        ]
    },
    {
        "id": "57c07569-26eb-52d4-ab34-f8c8caa94ccc",
        "name": "Tillie Walden",
        "bd_ids": [
            "4aa33079-62c2-5233-88ae-8e754c339e59"
        ]
    },
    {
        "id": "da949bb6-12f0-5d85-b093-d2ec26926f91",
        "name": "André Déraine",
        "bd_ids": [
            "1de89bb4-2d86-543c-845e-fba8f42fc847"
        ]
    },
    {
        "id": "2c0a8d04-1eac-5612-a1c7-676822d9ad90",
        "name": "Q Hayashida",
        "bd_ids": [
            "a9f1ba28-8e3f-5925-8f8c-bd63fb271d1b"
        ]
    },
    {
        "id": "206efe6f-29f9-5386-b123-f2bbd3f27f6d",
        "name": "Iris Pouy",
        "bd_ids": [
            "06d42289-e3ad-57c0-aade-03088507faa9"
        ]
    },
    {
        "id": "d52a43df-2aa2-547e-b98d-830dec705d02",
        "name": "Elizabeth Holleville",
        "bd_ids": [
            "06d42289-e3ad-57c0-aade-03088507faa9"
        ]
    },
    {
        "id": "3c90a47b-00bd-5d72-b26e-14e9361de953",
        "name": "Pierre-Henry Gomont",
        "bd_ids": [
            "34373ae6-8241-5dfd-ac94-c657bd97af69"
        ]
    },
    {
        "id": "ec033c79-cf70-5028-8b1d-6b02cccf0b5c",
        "name": "Zoe Thorogood",
        "bd_ids": [
            "0829463a-3433-53e5-ac54-605311f73a69"
        ]
    },
    {
        "id": "25a92ac6-0606-546b-91d9-21824fdc82a1",
        "name": "Felix Laurent",
        "bd_ids": [
            "f95d6e61-6426-5b0b-9311-b9e8ecb36b78"
        ]
    },
    {
        "id": "ee98cfb4-9b32-5356-b3be-337badf7aa02",
        "name": "Exaheva",
        "bd_ids": [
            "f95d6e61-6426-5b0b-9311-b9e8ecb36b78"
        ]
    },
    {
        "id": "3b934034-aca9-5ef9-a4d4-f0dbf63716dd",
        "name": "Luca Harari",
        "bd_ids": [
            "fdf7972d-6b2b-5ace-9939-d1b83cedae14"
        ]
    },
    {
        "id": "a531559e-8dbe-5b47-b3b7-b6e452214bd7",
        "name": "Arthur Harari",
        "bd_ids": [
            "fdf7972d-6b2b-5ace-9939-d1b83cedae14"
        ]
    },
    {
        "id": "bed4e616-fb1a-51d5-8789-d3a7c519765c",
        "name": "Will McPhail",
        "bd_ids": [
            "0f55b110-f82c-5092-8299-3149fdc8c9c9"
        ]
    },
    {
        "id": "c6bfc388-ba3c-5aa7-b627-d7528e7b7f95",
        "name": "Baptiste Sornin",
        "bd_ids": [
            "c2f61a7e-3816-5686-b9e5-d9556ee77049"
        ]
    },
    {
        "id": "ff780b2f-973b-5b78-8aaf-b22f31bc1bb4",
        "name": "Marie Baudet",
        "bd_ids": [
            "c2f61a7e-3816-5686-b9e5-d9556ee77049"
        ]
    },
    {
        "id": "e2139e97-c7d1-5124-b077-ea4291aa3032",
        "name": "Tatsuki Fujimoto",
        "bd_ids": [
            "e98c4039-8132-5dd6-9489-661fca8f7743"
        ]
    },
    {
        "id": "11f8a644-a339-59d8-af48-8b26d8709fbd",
        "name": "Sole Otero",
        "bd_ids": [
            "e24b2289-3eba-5581-9e3b-7c3d08251f70"
        ]
    },
    {
        "id": "ae7b2afb-f773-5588-a836-7f22fa49d247",
        "name": "Ahora Travé",
        "bd_ids": [
            "fb6cbc79-3c98-5889-838a-b334b7606395"
        ]
    },
    {
        "id": "06d2e44e-3bc3-5c38-80b2-d2bc46f5a2d5",
        "name": "Yoshijazu Yasuhiko",
        "bd_ids": [
            "b0b3870c-0997-5868-bd23-6e08e3cc0aac"
        ]
    },
    {
        "id": "bac10044-bf28-587c-bf43-2ca135089535",
        "name": "Tsuru Ringo Star",
        "bd_ids": [
            "1c9e35cc-80d4-5dce-8e80-2874fe876600"
        ]
    },
    {
        "id": "5ffbe2d2-ae0e-55cf-b3ab-8c691acbaddf",
        "name": "Sakana Sakatsuki",
        "bd_ids": [
            "4066190a-e2a3-5eda-bb01-cd996e6b7eda"
        ]
    },
    {
        "id": "ac8b85c4-99d5-5de7-a631-34672a8a642e",
        "name": "Ryôko Kui",
        "bd_ids": [
            "dd62a84b-d5d0-581d-85ff-398583396ee1"
        ]
    },
    {
        "id": "ce1989f6-f25c-5cf4-9899-cb4528ed5422",
        "name": "Eleonor Marchal",
        "bd_ids": [
            "c7c00974-55df-5ddb-9094-599a49fedc04"
        ]
    },
    {
        "id": "31387e90-fc18-5d6c-8a6a-6bd2ceef6053",
        "name": "Florence Cestac",
        "bd_ids": [
            "d3ae501d-a740-50fa-9b36-23681a63e221"
        ]
    },
    {
        "id": "542d6a4e-eee5-5d28-b43b-1522bc6c23b7",
        "name": "Jean Teulé",
        "bd_ids": [
            "d3ae501d-a740-50fa-9b36-23681a63e221"
        ]
    },
    {
        "id": "8c3c54b4-5338-5cf9-9db4-e376482d841b",
        "name": "Jim Bishop",
        "bd_ids": [
            "9e1ead2f-e94b-51c4-a530-25ff413b4630"
        ]
    },
    {
        "id": "0b088127-8e8e-5e67-aade-8ee924e23e14",
        "name": "Hideo Azuma",
        "bd_ids": [
            "1d9f61ac-e443-5d00-95d6-232abbc96584"
        ]
    },
    {
        "id": "d34f9a45-6215-5a8a-b4d6-dfb9d6a92541",
        "name": "Camille Potte",
        "bd_ids": [
            "8f3dfff9-18f4-517b-956a-375093f86315"
        ]
    },
    {
        "id": "1895a4c2-2cf2-5967-b5b1-2b87bfb4c910",
        "name": "Ezra Cleytan Daniels",
        "bd_ids": [
            "69fc7e78-c691-52d1-9568-ff25b698eaab"
        ]
    },
    {
        "id": "a47f6301-1e18-51f0-8386-ac488ee37b7c",
        "name": "Daisuke Igarachi",
        "bd_ids": [
            "c503e169-f7e8-50eb-bba0-7d391d6a17ce"
        ]
    },
    {
        "id": "e6332846-dc60-5a6c-83ab-f5180adb17d5",
        "name": "Quentin Rigaud",
        "bd_ids": [
            "ebab55bf-6f8b-5ebe-8a63-63805845355c"
        ]
    },
    {
        "id": "e582c7f5-c5b4-5f7e-ac05-d3296bfd9708",
        "name": "Camille Van Hoof",
        "bd_ids": [
            "599583d1-2538-5fdb-ad77-90fc339b3178"
        ]
    },
    {
        "id": "5a24ef24-132a-56bc-aef0-b3b1529d528e",
        "name": "Mikael Ross",
        "bd_ids": [
            "3dddd453-4856-5647-b862-58ee435de96b"
        ]
    },
    {
        "id": "091254d8-d0c9-5726-a5c2-f19e2f7c8d92",
        "name": "Kabi Nagata",
        "bd_ids": [
            "78e93b93-fff0-5559-a078-8ca878174a6c"
        ]
    },
    {
        "id": "3732fd8e-96c9-58f7-8134-54e3af2e2b77",
        "name": "Aya Kanno",
        "bd_ids": [
            "71b57a4d-63c6-5220-b416-c2eacf41695e"
        ]
    },
    {
        "id": "e9c52477-ae82-5bb5-862b-fe4d54df2502",
        "name": "Marcel Shorjian",
        "bd_ids": [
            "def98803-9ae8-50cc-9cb5-3d7c8bbc9c7c"
        ]
    },
    {
        "id": "787e0d65-0fe6-5b9f-a9ec-1afe8993ea3d",
        "name": "Jeanne Sterkers",
        "bd_ids": [
            "def98803-9ae8-50cc-9cb5-3d7c8bbc9c7c"
        ]
    },
    {
        "id": "c87d7744-49cb-5480-8fd5-ac0903b18d99",
        "name": "Chris Samnee",
        "bd_ids": [
            "1c16dd39-9b71-570b-adf9-dd949b0876ed"
        ]
    },
    {
        "id": "16787ee4-56ac-5736-b0b0-2d831ee42d6c",
        "name": "Richard Stark",
        "bd_ids": [
            "2577974a-9695-5f41-94a9-6ba5ebd90174"
        ]
    },
    {
        "id": "f149dc55-7d01-5e6c-89f4-ed837f8de8b5",
        "name": "Kieran Headline",
        "bd_ids": [
            "2577974a-9695-5f41-94a9-6ba5ebd90174"
        ]
    },
    {
        "id": "9f6d02b9-d58d-521b-bac5-a096f26c125a",
        "name": "Marjane Satrapi",
        "bd_ids": [
            "89d152e7-f57c-5b0e-8d95-8f5fad2dc896"
        ]
    },
    {
        "id": "d6e87a93-7b87-56df-b0b5-784f597acfd5",
        "name": "Keiko Takemiya",
        "bd_ids": [
            "55173791-1d25-5974-be37-4ae3bfac5225"
        ]
    },
    {
        "id": "fab79174-cd77-5bff-8ef0-204115fd6685",
        "name": "Jérémie Moreau",
        "bd_ids": [
            "d2606770-6e64-56ad-9f24-2c1734030214"
        ]
    },
    {
        "id": "044a392b-edae-5a8b-bf64-8bc911b445b8",
        "name": "Lynda Barry",
        "bd_ids": [
            "ba70089b-dc50-5706-ae33-e7b7f3d3c4ed"
        ]
    },
    {
        "id": "466e5af5-67e4-5fcb-b087-0e8d4f1a7ed6",
        "name": "Luz",
        "bd_ids": [
            "c422ca47-19e7-5530-96ae-3099c5ec9dc8"
        ]
    },
    {
        "id": "cf14aca0-99b7-5e93-bac5-cc55c93da085",
        "name": "Lorelei L'Affeter",
        "bd_ids": [
            "7b60d495-19b6-5aec-83d2-df40acb1d3e8"
        ]
    },
    {
        "id": "413f2343-f0c5-5672-aa0a-050973a682f9",
        "name": "Aurélien Maury",
        "bd_ids": [
            "7afa0be1-9f65-5af9-b8ca-8febc5ccfa4a"
        ]
    },
    {
        "id": "aea68d40-ddb1-5354-b4e8-5fb4dbca4c9e",
        "name": "Rumiko Takahashi",
        "bd_ids": [
            "ec34073f-32f3-5b74-8e70-eb2e9937a36f"
        ]
    },
    {
        "id": "cb6b2c97-9182-501d-90a0-2c812dd7d641",
        "name": "Claire Fauvel",
        "bd_ids": [
            "fd110a14-3cb4-5407-a837-b3bae1c9b278"
        ]
    },
    {
        "id": "e7455245-dd03-5c13-a656-e0c6420e9265",
        "name": "Pao Yen Ding",
        "bd_ids": [
            "0227a664-60ac-5e77-bb89-031cf0893d1e"
        ]
    },
    {
        "id": "3ed49b39-8117-577d-ba13-6ac94a9e388b",
        "name": "Shohei Manabe",
        "bd_ids": [
            "bb2f4bd6-ea0d-5028-bd8d-d3eb6437888c"
        ]
    },
    {
        "id": "bac0e452-b75b-5cc7-a4e4-ad8adf9ba347",
        "name": "Junji Ito",
        "bd_ids": [
            "543529b3-41ab-5afc-a381-7ed1bfab677b"
        ]
    },
    {
        "id": "4abb5d53-7a59-5901-8c93-7de96ba7c098",
        "name": "Raymond Briggs",
        "bd_ids": [
            "11d7eace-ebf2-59d3-a330-cd442d3557a3"
        ]
    },
    {
        "id": "3254de0b-373e-565d-9416-53a8316474c8",
        "name": "Serge Lehmann",
        "bd_ids": [
            "1bc85f3d-8932-5b00-b6fd-333b32ee53b9"
        ]
    },
    {
        "id": "bb3b2c50-6f6f-552e-a8aa-c43c4c7b9427",
        "name": "Pig Paddle Mannimarco",
        "bd_ids": [
            "605a6f52-dfac-5d30-9135-70f21673a9c9"
        ]
    },
    {
        "id": "f7168e39-bf20-5d5a-91f5-7b0b971b588c",
        "name": "Rick Remender",
        "bd_ids": [
            "a8920edf-9eb7-5296-9429-4a13002c70c4"
        ]
    },
    {
        "id": "8b277120-560b-5807-b3c5-c0a546bce427",
        "name": "Max Fiumara",
        "bd_ids": [
            "a8920edf-9eb7-5296-9429-4a13002c70c4"
        ]
    },
    {
        "id": "04566a81-2c42-5f40-84bf-169e9ff41670",
        "name": "Bilquis Evely",
        "bd_ids": [
            "980619c8-13ee-54cf-960c-0ad3a452965b"
        ]
    },
    {
        "id": "7a56b388-39a7-5b66-af71-1a9304760e4a",
        "name": "Régis Hautières",
        "bd_ids": [
            "80dbe48d-5ef6-50a1-8f93-23619b07cbde"
        ]
    },
    {
        "id": "da90896c-8026-554d-a736-441570b78261",
        "name": "Marie Spénale",
        "bd_ids": [
            "30dd4d30-1325-557c-b42b-6ad0894bf6b8"
        ]
    },
    {
        "id": "04cef3b4-6b2a-5efc-85f2-2a0ff95481cd",
        "name": "Junko Mizuno",
        "bd_ids": [
            "50afc3e1-c60e-5915-b756-8b0760228a32"
        ]
    },
    {
        "id": "dfaa83f5-acf7-5b22-baf7-0bf497056f9e",
        "name": "Nick Dragotta",
        "bd_ids": [
            "8a2399e8-979b-5ac8-9645-0c778e3f4edc"
        ]
    },
    {
        "id": "2ceec585-d739-59b6-948a-6b8117a74f5e",
        "name": "Vincent Brugeas",
        "bd_ids": [
            "22420ca8-73c3-508a-a4ca-2f9378f14338"
        ]
    },
    {
        "id": "d1a00a6a-c6a2-526c-8bca-05745c2bdcc0",
        "name": "Ronan Toulhoat",
        "bd_ids": [
            "22420ca8-73c3-508a-a4ca-2f9378f14338"
        ]
    },
    {
        "id": "69eb4ee1-b8a0-50b0-adec-5f64e115725a",
        "name": "Jean-Christophe Deveney",
        "bd_ids": [
            "46c2d81c-4961-5353-9c99-230e81b565d0"
        ]
    },
    {
        "id": "1a9c1499-d284-5ffe-9045-4e3918619a42",
        "name": "Edouard Cour",
        "bd_ids": [
            "46c2d81c-4961-5353-9c99-230e81b565d0"
        ]
    }
];

module.exports = {
    events,
    bds,
    authors,
};
