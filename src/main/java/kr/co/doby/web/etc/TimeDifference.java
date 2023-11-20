package kr.co.doby.web.etc;

import java.util.Date;

public class TimeDifference {

    public static String getTimeDifference(Date date) {
        Date now = new Date();

        long diff = now.getTime() - date.getTime();
        long seconds = diff / 1000;
        long minutes = seconds / 60;
        long hours = minutes / 60;
        long days = hours / 24;
        long months = days / 30;
        long years = days / 365;

        if (years > 0)
            return years + "년 전";
        else if (months >= 12)
            return "1년 전";
        else if (months > 0)
            return months + "달 전";
        else if (days >= 30)
            return "1달 전";
        else if (days > 0)
            return days + "일 전";
        else if (hours >= 24)
            return "1일 전";
        else if (hours > 0)
            return +hours + "시간 전";
        else if (minutes >= 60)
            return "1시간 전";
        else if (minutes > 0)
            return minutes + "분 전";
        else
            return "방금 전";
    }
}

