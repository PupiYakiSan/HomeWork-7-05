Feature: movie tests
    Scenario: happy path buy one ticket
        Given user is on page "http://qamid.tmweb.ru/client/index.php"
        When user selects the day "2" and session "0"
        And user chooses place "0" in the second hall
        And user buys a ticket by clicking on the button
        Then user goes to the page "://qamid.tmweb.ru/client/ticket.php"

    Scenario: happy path buy two ticket
        Given user is on page "http://qamid.tmweb.ru/client/index.php"
        When user selects the day "2" and session "0"
        And user chooses place "0" in the second hall
        And user chooses second place in the second hall
        And user buys a ticket by clicking on the button
        Then user goes to the page "://qamid.tmweb.ru/client/ticket.php"
    
    Scenario: bad path the place is occupied
        Given user is on page "http://qamid.tmweb.ru/client/index.php"
        When user selects the day "2" and session "0"
        And user chooses place "0" in the second hall
        And user buys a ticket by clicking on the button
        And user2 is on page "http://qamid.tmweb.ru/client/index.php"
        And user selects the day "2" and session "0"
        And user2 chose the same location as user
        Then user2 sees that the button is not activated