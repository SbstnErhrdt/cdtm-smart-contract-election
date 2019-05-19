pragma solidity >=0.4.21 <0.7.0;

contract Election {
    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        string party;
        uint voteCount;
    }
    
    // Model a polling station
    struct PollingStation {
        uint id;
        string name;
        uint voteCount;
        uint amountOfEligibleVoters;
        string location;
    }

    // Store Candidates
    mapping(uint => Candidate) public id2candidates;
    // Store Stations
    mapping(uint => PollingStation) public id2pollingStations;

    mapping(address => PollingStation) public address2pollingStation;

    // hash2candidateID
    mapping(bytes32 => uint) public hash2candidateId;

    // Store Candidates Count
    uint public candidatesCount;

    // Store Stations Count
    uint public pollingStationsCount;

    // voted event
    event votedEvent (
        uint indexed _candidateId,
        bytes32 indexed _hash
    );

    // Constructor
    constructor() public {
        // Add candidates
        addCandidate("Ekrem Imamoglu", "CHP");
        addCandidate("Binali Yildirim", "AK Party");
        // Add polling stations
        addStation("Adalar",14221);
        addStation("Arnavutkoey",180080);
        addStation("Ataşehir",375208);
        addStation("Avcılar",364682);
        addStation("Bağcılar",738809);
        addStation("Bahçelievler",590063);
        addStation("Bakırköy",219145);
        addStation("Basaksehi",245019);
        addStation("Bayrampasa",269481);
        addStation("Besiktas",184390);
        addStation("Beykoz",221542);
        addStation("Beylikduezue",204873);
        addStation("Beyoglu",248084);
        addStation("Bueyuekcekmece",182017);
        addStation("Catalca",35337);
        addStation("Cekmekoey",163525);
        addStation("Esenler",461072);
        addStation("Esenyurt",446777);
        addStation("Eyuep",331551);
        addStation("Faith",431147);
    }
    
    // Add a candidate to the election
    function addCandidate (string memory _name, string memory _party) private {
        candidatesCount ++;
        Candidate memory candidate;
        candidate.id = candidatesCount;
        candidate.name = _name;
        candidate.party = _party;
        candidate.voteCount = 0;
        // Add the candidate to the mapping
        id2candidates[candidatesCount] = candidate;
    }

    // Add a polling station to the election
    function addStation (string memory _name, uint _amountOfEligibleVoters) private {
        pollingStationsCount ++;
        PollingStation memory station;
        station.id = candidatesCount;
        station.name = _name;
        station.amountOfEligibleVoters = _amountOfEligibleVoters;
        station.voteCount = 0;
        // Add the polling stations to the mapping
        id2pollingStations[pollingStationsCount] = station;
    }

    // Add a polling station to the election
    // Assign an address to the station
    function assignAddressToStation (uint _stationID) public {
        address2pollingStation[msg.sender] = id2pollingStations[_stationID];
    }

    function getStation(uint _id) public view returns(uint id, string memory name, uint amountOfEligibleVoters) {
        PollingStation memory station;
        station = id2pollingStations[_id];
        id = _id;
        name = station.name;
        amountOfEligibleVoters = station.amountOfEligibleVoters;
    }

    function getCandidate(uint _id) public view returns(uint id, string memory name, string memory party){
        Candidate memory candidate;
        candidate = id2candidates[_id];
        id = _id;
        name = candidate.name;
        party = candidate.party;
    }

    function getVoteCandidate(bytes24 _hash) public view returns(uint id, string memory name, string memory party){
        uint candidateId = hash2candidateId[_hash];
        (id, name, party) = getCandidate(candidateId);
    }

    // TODO
    //function getStationByAdress() public returns(PollingStation memory s) {
    //    return address2pollingStation[msg.sender];
    //}

    // Execute the vote
    function vote (uint _candidateId, bytes32 _hash) public {
        // require that they haven't voted before
        // require(voters[msg.sender]==false);

        // Check if the require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount, "The candidate does not exist");

        // Find the polling station
        PollingStation memory station = address2pollingStation[msg.sender];

        // Check if the current vote count is lower than the max amoiunt of eligible voters
        require(station.voteCount < station.amountOfEligibleVoters, "The amount of votes exeed the max votes");

        // record that voter has voted for a candidate
        hash2candidateId[_hash] = _candidateId;

        // update candidate vote Count
        id2candidates[_candidateId].voteCount ++;

        // trigger voted event
        emit votedEvent(_candidateId, _hash);
    }
}