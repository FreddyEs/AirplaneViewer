/**
 * Created by Frederik on 28.05.2015.
 */

var APViewer = APViewer || {};

APViewer.simulation = {
    Position: function(lon, lat, alt) {
        this.longitude = lon;
        this.latitude = lat;
        this.altitude = alt;
    },

    /*
     * pStart:  Startposition des Flugzeugs in Longitude, Latitude, Height
     * vHor:    Geschwindigkeit Horrizontal
     * v_vertical:   Geschwindigkeit Vertikal
     * t:       Zeitintervall in Sekunden
     * dir:     Flugrichtung in Radiant zu Nord
     */
    calculatePosition: function (positionOld, v_horizontal, v_vertical, time_difference, direction) {
        var t = time_difference;
        var alpha = direction;
        var r_z0 = positionOld.altitude;
        var r_x0 = positionOld.longitude;
        var r_y0 = positionOld.latitude;
        var kt_ms = 0.51444;

        var v_z = v_vertical;
        var v_x = Math.sin(alpha) * v_horizontal * kt_ms;
        var v_y = Math.cos(alpha) * v_horizontal * kt_ms;

        var u_x = 360/(40000000 * Math.cos(r_y0));
        var u_y = 360/40000000;

        var r_z = v_z * (t/60) + r_z0;
        var r_x = t * v_x * u_x + r_x0;
        var r_y = t * v_y * u_y + r_y0;

        var positionNew = new APViewer.simulation.Position(r_x, r_y, r_z);
        return positionNew;
    }
};



