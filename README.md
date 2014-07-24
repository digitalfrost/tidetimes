tidetimes
=========

Displays UK tide times on the command line

## Examples

### Get today's tide times for Newquay

    ♣ tidetimes @newquay
      High Tide: 04:14 Height: 6.00m
      Low Tide: 10:37 Height: 1.80m
      High Tide: 16:38 Height: 6.20m
      Low Tide: 23:06 Height: 1.60m

### Get tomorrow's tide times for Newquay

    ♣ tidetimes tomorrow @newquay
      High Tide: 05:01 Height: 6.20m
      Low Tide: 11:19 Height: 1.50m
      High Tide: 17:20 Height: 6.40m
      Low Tide: 23:46 Height: 1.40m

### Get saturday's tide times for Falmouth

    ♣ tidetimes saturday @falmouth
      High Tide: 05:43 Height: 4.70m
      Low Tide: 12:28 Height: 0.90m
      High Tide: 18:00 Height: 5.00m
      Low Tide: 00:50 Height: 0.90m

## Available locations

700 UK locations available. 
Full list is available here: http://www.tidetimes.co.uk/locations

### The @ symbol is optional when specifying the location
    ♣ tidetimes dover
      Low Tide: 05:08 Height: 1.70m
      High Tide: 10:29 Height: 5.90m
      Low Tide: 17:32 Height: 1.60m
      High Tide: 22:55 Height: 6.00

### Use dashes instead of spaces in the location name
    ♣ tidetimes @bluemull-sound
      Low Tide: 02:14 Height: 0.70m
      High Tide: 08:45 Height: 2.10m
      Low Tide: 14:28 Height: 0.90m
      High Tide: 20:59 Height: 2.40m

## Disclaimer

This utility scrapes http://www.tidetimes.co.uk, use it responsibly and don't rely on it for navigation.

## License

MIT License
