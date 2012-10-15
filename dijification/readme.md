# Dojo-Bootstrap Dijified

This is an experiment in porting the Dojo-Bootstrap modules to the Dojo Dijit architecture. Since this project targets Dojo developers, it would make sense to make widget handling more dojoesque and thus more familiar. This brings two main advantages:

+ Making use of the already existing infrastructure for declarativ widget instantiation by means of dojo.parser
+ True programmatic widget handling when this is desired - no full DOM querying if this is not required