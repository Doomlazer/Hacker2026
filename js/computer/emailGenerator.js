const EmailGenerator = (() => {
  const names = [
    "Alex", "Mike", "Sarah", "James", "Daniel",
    "Chris", "Jennifer", "David", "Robert", "Lisa",
    "Tom", "Jessica", "Brian", "Kevin", "Amanda"
  ];

  const companies = [
    "Northstar Systems",
    "Westbridge Consulting",
    "Harrison & Co.",
    "Metro Office Supplies",
    "Parker Electronics",
    "Greenfield Services"
  ];

  const topics = [
    "the invoice",
    "the delivery",
    "the schedule",
    "the paperwork",
    "the meeting",
    "the account",
    "the new equipment",
    "the office move",
    "the contract",
    "the order"
  ];

  const days = [
    "Friday",
    "Saturday",
    "Sunday",
    "tomorrow",
    "next week"
  ];

  const times = [
    "9:00",
    "10:30",
    "noon",
    "2:00",
    "5:30",
    "6:00"
  ];

  const templates = {
personal: {
  subjects: [
    "Plans for {day}",
    "Are you coming?",
    "This weekend",
    "Quick question",
    "Dinner Friday?",
    "Call me when you get this",
    "Got your message",
    "About tomorrow",
    "You around?",
    "What are you doing Saturday?",
    "Just checking in",
    "Haven't heard from you",
    "One more thing",
    "Don't forget",
    "Are we still on?",
    "Sorry I missed you",
    "Thanks for yesterday",
    "About the other night",
    "Can you do me a favor?",
    "Let me know"
  ],

  messages: [

    // --------------------------------------------------------
    // CASUAL
    // --------------------------------------------------------

    `{greeting}

Are you still coming over {day}? I think everyone is going to be there around {time}.

Let me know.

{signoff}`,

    `{greeting}

What are you up to {day}? A few of us are going out later and I thought I'd see if you wanted to come along.

{signoff}`,

    `{greeting}

Just wondering if you're around this weekend. Haven't seen you in ages.

Give me a call.

{signoff}`,

    `{greeting}

Are we still on for tonight? I can meet you downtown around {time} if that's easier.

{signoff}`,

    `{greeting}

A couple of us are going to the pub after work. You should come if you're free.

{signoff}`,

    `{greeting}

You doing anything Saturday? I might head over to {person}'s place later.

Let me know if you're interested.

{signoff}`,

    // --------------------------------------------------------
    // MAKING PLANS
    // --------------------------------------------------------

    `{greeting}

How about dinner on {day}? Nothing fancy, just somewhere near the usual place.

Would {time} work for you?

{signoff}`,

    `{greeting}

I'll be in town on {day}. If you're free, we should grab a coffee or something.

Let me know.

{signoff}`,

    `{greeting}

I'm going to the movies tonight. There's a showing at {time} if you want to come.

No worries if you're busy.

{signoff}`,

    `{greeting}

We're having people over on Saturday. Nothing huge, probably just a few friends.

Come by if you can.

{signoff}`,

    `{greeting}

Do you want to meet up after work tomorrow? I should be finished around {time}.

{signoff}`,

    `{greeting}

What time are you getting there on {day}? I don't want to show up an hour early again.

{signoff}`,

    `{greeting}

Still okay for lunch tomorrow?

I'll be near the office around noon.

{signoff}`,

    `{greeting}

I'm thinking about heading out of town this weekend. You're welcome to come if you want.

Let me know before Friday.

{signoff}`,

    // --------------------------------------------------------
    // CHECKING IN
    // --------------------------------------------------------

    `{greeting}

Haven't heard from you in a while. Everything okay?

Give me a call when you get a chance.

{signoff}`,

    `{greeting}

Just checking in. How's everything going?

You disappeared for a few days there.

{signoff}`,

    `{greeting}

I tried calling earlier but got your voicemail.

Nothing urgent. Just wanted to talk to you about something.

{signoff}`,

    `{greeting}

You never called me back.

I'm guessing you've been busy, but give me a ring when you get a chance.

{signoff}`,

    `{greeting}

I haven't seen you online lately. Hope everything is okay.

Talk to you soon.

{signoff}`,

    `{greeting}

Just wanted to make sure you got home alright last night.

It was good seeing you.

{signoff}`,

    // --------------------------------------------------------
    // FAVORS
    // --------------------------------------------------------

    `{greeting}

Could you do me a favor? If you're going past the store today, could you pick up some batteries?

I'll pay you back.

{signoff}`,

    `{greeting}

Any chance you could give me a ride on {day}? My car is still at the garage.

I'd really appreciate it.

{signoff}`,

    `{greeting}

Can you remind me what time we're supposed to be there tomorrow?

I completely forgot.

{signoff}`,

    `{greeting}

Do you still have my copy of that CD? I've been looking for it everywhere.

Bring it next time you see me.

{signoff}`,

    `{greeting}

If you happen to be near my place this week, could you drop off those papers?

No rush.

{signoff}`,

    `{greeting}

Could you give {person} a message for me if you see them?

I've been trying to get hold of them.

{signoff}`,

    // --------------------------------------------------------
    // APOLOGIES
    // --------------------------------------------------------

    `{greeting}

Sorry I didn't make it yesterday. Things got a little hectic here.

I'll make it up to you.

{signoff}`,

    `{greeting}

Sorry about last night. I probably shouldn't have said what I did.

Hope we're okay.

{signoff}`,

    `{greeting}

I'm sorry I missed your call. I was out and didn't get back until late.

I'll call you tonight.

{signoff}`,

    `{greeting}

Sorry for disappearing on you. I've had a lot going on lately.

I'll explain when I see you.

{signoff}`,

    `{greeting}

I completely forgot about our plans. That's my fault.

Can we try again next week?

{signoff}`,

    // --------------------------------------------------------
    // THANKS
    // --------------------------------------------------------

    `{greeting}

Thanks again for helping me yesterday.

I honestly don't know how I would have managed without you.

{signoff}`,

    `{greeting}

Thanks for the ride last night. I owe you one.

Dinner is on me next time.

{signoff}`,

    `{greeting}

Just wanted to say thanks for everything.

It was really good seeing you.

{signoff}`,

    `{greeting}

Thanks for letting me stay over. I promise I won't make a habit of it.

{signoff}`,

    // --------------------------------------------------------
    // SMALL TALK
    // --------------------------------------------------------

    `{greeting}

Did you hear about {person}? Apparently they're moving next month.

Didn't see that coming.

{signoff}`,

    `{greeting}

Have you seen the new place downtown? A few people were talking about it yesterday.

Might be worth checking out.

{signoff}`,

    `{greeting}

The weather is supposed to be terrible this weekend. Typical.

I guess we'll have to find something else to do.

{signoff}`,

    `{greeting}

Did you ever finish that book you were talking about?

I'm looking for something new to read.

{signoff}`,

    `{greeting}

Have you heard the new album yet?

It's actually pretty good. Not what I expected.

{signoff}`,

    `{greeting}

I ran into {person} earlier. They asked about you.

I didn't know what to tell them.

{signoff}`,

    // --------------------------------------------------------
    // SLIGHTLY MORE PERSONAL
    // --------------------------------------------------------

    `{greeting}

I know we've both been busy lately, but we should probably catch up properly sometime.

Coffee this week?

{signoff}`,

    `{greeting}

I was thinking about the other night.

Sorry things got a little weird. I hope you didn't take it the wrong way.

{signoff}`,

    `{greeting}

It was good talking to you yesterday.

I didn't realize how much I needed to get that off my chest.

{signoff}`,

    `{greeting}

I know you said you were fine, but you didn't really sound fine.

If you want to talk, I'm around.

{signoff}`,

    `{greeting}

I probably shouldn't be sending this by email, but I wanted to say something before I forgot.

Call me when you get this.

{signoff}`,

    // --------------------------------------------------------
    // VERY SHORT EMAILS
    // --------------------------------------------------------

    `Hey,

You around tonight?

{signoff}`,

    `Hi,

Call me when you get this.

{signoff}`,

    `Hey {recipientName},

Still coming tomorrow?

{signoff}`,

    `Hi {recipientName},

Thanks again.

Talk soon.

{signoff}`,

    `Hey,

Are we still meeting at {time}?

{signoff}`,

    // --------------------------------------------------------
    // MORE NATURAL / MESSY
    // --------------------------------------------------------

    `{greeting}

Sorry, completely forgot to mention this earlier.

Can you bring the thing I left at your place?

You know the one.

{signoff}`,

    `{greeting}

Okay, stupid question.

What was the name of that restaurant we went to last time?

{signoff}`,

    `{greeting}

Ignore my last email. I just remembered what I was going to ask.

I'll tell you later.

{signoff}`,

    `{greeting}

Actually, never mind.

It's sorted now.

Thanks anyway.

{signoff}`,

    `{greeting}

Sorry, sent that before I finished writing it.

Anyway, I'll call you tonight.

{signoff}`,

    `{greeting}

I just remembered something you said the other day and now I'm curious.

Ask me about it when you see me.

{signoff}`,

    `{greeting}

This is probably easier to explain over the phone.

Give me a call when you have a minute.

{signoff}`,

    // --------------------------------------------------------
    // FAMILY-ISH / FAMILIAR
    // --------------------------------------------------------

    `{greeting}

Don't forget we're all getting together on Sunday.

Mom wants everyone there around noon.

Call me if anything changes.

{signoff}`,

    `{greeting}

Your brother called earlier.

He said he'll be staying with us for a couple of days.

Just thought I'd let you know.

{signoff}`,

    `{greeting}

Dad asked if you'd called lately.

You should probably give him a ring before he starts complaining about it again.

{signoff}`,

    `{greeting}

Mom's birthday is coming up.

Have you figured out what you're getting her yet?

{signoff}`,

    `{greeting}

We're having dinner on Sunday.

Try not to be late this time.

{signoff}`,

    // --------------------------------------------------------
    // FRIENDSHIP / CONFLICT
    // --------------------------------------------------------

    `{greeting}

I'm still annoyed about yesterday, if I'm being honest.

But I'd rather talk about it than keep ignoring each other.

{signoff}`,

    `{greeting}

I don't know if you were joking earlier, but that didn't come across very well.

We should probably talk.

{signoff}`,

    `{greeting}

Forget what I said earlier.

I was tired and in a bad mood.

Sorry.

{signoff}`,

    `{greeting}

Are you still upset with me?

I'd rather know than keep guessing.

{signoff}`,

    `{greeting}

I know we've had our differences lately, but I don't want things to stay like this.

Let me know if you want to talk.

{signoff}`,

    // --------------------------------------------------------
    // PERIOD-FLAVORED
    // --------------------------------------------------------

    `{greeting}

I tried sending you a message on MSN but I guess you weren't online.

Anyway, give me a call when you're around.

{signoff}`,

    `{greeting}

My internet has been acting up again.

If you don't hear from me, that's probably why.

{signoff}`,

    `{greeting}

I'm going to be at the internet cafe around {time}.

If you're online, I'll probably see you there.

{signoff}`,

    `{greeting}

I finally got the new computer set up.

You should come over and take a look at it sometime.

{signoff}`,

    `{greeting}

I burned you a copy of that CD you wanted.

I'll bring it next time I see you.

{signoff}`,

    // --------------------------------------------------------
    // AMBIGUOUS / POTENTIAL STORY HOOKS
    // --------------------------------------------------------

    `{greeting}

Something came up and I need to change the plans for tomorrow.

I'll explain when I see you.

{signoff}`,

    `{greeting}

I spoke to {person} earlier.

Apparently they know what happened.

I'll tell you more when we talk.

{signoff}`,

    `{greeting}

Can you call me when you're somewhere private?

It's nothing terrible. I'd just rather not discuss it over email.

{signoff}`,

    `{greeting}

I left the papers where you told me to.

Let me know when you've picked them up.

{signoff}`,

    `{greeting}

Don't mention this to {person} yet.

I'll explain everything when I see you.

{signoff}`,

    `{greeting}

I found what you were looking for.

Give me a call and we'll figure out what to do with it.

{signoff}`,

    `{greeting}

I think we should talk before you make any decisions.

Call me tonight if you can.

{signoff}`,

    `{greeting}

I won't be around tomorrow after all.

If you still need to see me, try Friday.

{signoff}`,

    // --------------------------------------------------------
    // OLD-FASHIONED / FORMAL FRIENDLY
    // --------------------------------------------------------

    `{greeting}

Just wanted to let you know I'll be in town next week.

If you have some free time, it'd be nice to catch up.

{signoff}`,

    `{greeting}

I hope everything is going well with you.

It's been far too long since we've spoken.

{signoff}`,

    `{greeting}

I wanted to thank you properly for helping me out.

I really appreciate it.

{signoff}`,

    `{greeting}

Let me know if you need anything while I'm away.

I'll be back next week.

{signoff}`
  ]
},





work: {
  subjects: [
    "Meeting tomorrow",
    "Quick question",
    "Regarding {topic}",
    "Can you take a look at this?",
    "Quick update",
    "A couple of things",
    "Following up",
    "Just checking",
    "Need your help",
    "Before tomorrow",
    "For your information",
    "One more thing",
    "About this morning",
    "Regarding the meeting",
    "Schedule for next week",
    "A quick favor",
    "Can we talk?",
    "Please call me",
    "Something came up",
    "Any update?",
    "Where are we with this?",
    "Still waiting on this",
    "Need this by Friday",
    "Important",
    "FYI",
    "Question about the report",
    "The paperwork",
    "The new schedule",
    "About the client",
    "About the order",
    "This afternoon",
    "Tomorrow morning",
    "Next week",
    "A small problem",
    "Bad news",
    "Good news",
    "Thanks for your help",
    "Sorry about this",
    "Just wanted to let you know"
  ],

  messages: [

    // ========================================================
    // GENERAL COWORKER
    // ========================================================

    `{greeting}

Just wanted to check whether you've had a chance to look at {topic}.

No rush, but I'd like to get it finished before the end of the week.

{signoff}`,

    `{greeting}

Do you know what's happening with {topic}?

I thought {person} was handling it, but I haven't heard anything.

{signoff}`,

    `{greeting}

Have you got a minute sometime today?

There's something I'd like to run past you.

{signoff}`,

    `{greeting}

Just a quick question about {topic}.

Do you remember what we agreed on yesterday?

{signoff}`,

    `{greeting}

I left the paperwork on your desk.

Have a look when you get a chance and let me know if anything needs changing.

{signoff}`,

    `{greeting}

I think we're almost finished with this.

There are just a couple of things left to sort out.

{signoff}`,

    `{greeting}

I wasn't sure who was supposed to handle this, so I thought I'd ask you first.

Let me know if it's not your department.

{signoff}`,

    `{greeting}

Did you get the documents I sent over this morning?

I just want to make sure they actually made it through.

{signoff}`,

    `{greeting}

I've finished my part.

You should have everything you need now.

{signoff}`,

    `{greeting}

Just letting you know that I'll be a little late tomorrow morning.

I have an appointment before work.

{signoff}`,

    // ========================================================
    // MEETINGS
    // ========================================================

    `{greeting}

Just a reminder that we're meeting tomorrow at {time}.

Same room as last time.

{signoff}`,

    `{greeting}

The meeting has been moved to {time}.

Apparently the client can't make the earlier time.

{signoff}`,

    `{greeting}

Do we still need to have the meeting this afternoon?

I thought we had everything covered yesterday.

{signoff}`,

    `{greeting}

I've attached the notes from today's meeting.

Let me know if I missed anything important.

{signoff}`,

    `{greeting}

Can you bring the figures for {topic} to the meeting tomorrow?

I don't think anyone else has them.

{signoff}`,

    `{greeting}

{person} won't be at the meeting tomorrow.

Apparently they're out sick.

{signoff}`,

    `{greeting}

The meeting room is booked all afternoon.

We'll have to use the smaller room instead.

{signoff}`,

    `{greeting}

Are you available around {time}?

I'd like to talk through a few things before the meeting.

{signoff}`,

    `{greeting}

I've had to cancel tomorrow's meeting.

I'll send around a new time once I know when everyone is available.

{signoff}`,

    `{greeting}

Can you sit in on the meeting tomorrow?

It would be useful to have someone who knows the details of {topic}.

{signoff}`,

    // ========================================================
    // DEADLINES
    // ========================================================

    `{greeting}

Just a reminder that we need {topic} finished by Friday.

Please let me know if that's going to be a problem.

{signoff}`,

    `{greeting}

We're running a little behind on this.

Can you give me an idea of when you'll have it finished?

{signoff}`,

    `{greeting}

The deadline has been moved up.

We now need everything by tomorrow afternoon.

Sorry for the short notice.

{signoff}`,

    `{greeting}

I know this was supposed to be finished yesterday.

Do you have an update for me?

{signoff}`,

    `{greeting}

Good news — we got an extra couple of days.

The new deadline is Monday.

{signoff}`,

    `{greeting}

I don't think we're going to make the original deadline.

Can we talk about what needs to be prioritized?

{signoff}`,

    `{greeting}

Please try to have this ready before {time}.

The client is expecting it this afternoon.

{signoff}`,

    `{greeting}

We're almost there.

If everyone gets their part done today, we should be okay.

{signoff}`,

    // ========================================================
    // CLIENTS
    // ========================================================

    `{greeting}

I spoke with the client this morning.

They're happy with the proposal but want a few changes.

I'll send you the details shortly.

{signoff}`,

    `{greeting}

The client called again about {topic}.

They'd really like an answer today.

{signoff}`,

    `{greeting}

Apparently the client wasn't happy with the last version.

Can you take another look before I send anything else?

{signoff}`,

    `{greeting}

We received confirmation from the client.

They've approved everything.

You can go ahead with the next step.

{signoff}`,

    `{greeting}

The client wants to push the meeting back to next week.

I'll let you know once they've suggested a new time.

{signoff}`,

    `{greeting}

I don't think we should send this to the client yet.

There are still a couple of errors in the document.

{signoff}`,

    `{greeting}

Can you send me the latest figures?

The client asked for them this morning.

{signoff}`,

    `{greeting}

The client says they never received the package.

Can you check what happened?

{signoff}`,

    // ========================================================
    // MANAGERS / BOSSES
    // ========================================================

    `{greeting}

I'd like to talk to you about {topic} when you have a chance.

Nothing urgent.

Come by my office sometime this afternoon.

{signoff}`,

    `{greeting}

Please make sure {topic} is taken care of before you leave today.

Let me know if you run into any problems.

{signoff}`,

    `{greeting}

I need the report on my desk by {time} tomorrow.

Please don't leave it until the last minute.

{signoff}`,

    `{greeting}

Good work on the project.

The client had some very positive things to say.

{signoff}`,

    `{greeting}

We need to talk about what happened yesterday.

Please come by my office when you arrive tomorrow.

{signoff}`,

    `{greeting}

I've approved the request.

You can go ahead and make the arrangements.

{signoff}`,

    `{greeting}

I'm going to be out of the office tomorrow.

If anything comes up, speak to {person}.

{signoff}`,

    `{greeting}

Please keep me updated on {topic}.

I don't want to hear about any problems after the deadline.

{signoff}`,

    // ========================================================
    // VENDORS / SUPPLIERS
    // ========================================================

    `{greeting}

I'm following up on our recent order.

We were expecting delivery by {day}.

Can you confirm the current status?

{signoff}`,

    `{greeting}

We've received the shipment, but there appears to be a problem with part of the order.

I'll send the details separately.

{signoff}`,

    `{greeting}

Can you confirm whether the new equipment will arrive this week?

We're trying to plan around the delivery.

{signoff}`,

    `{greeting}

Thanks for sending the quotation.

We'll review it and get back to you shortly.

{signoff}`,

    `{greeting}

We still haven't received the invoice for the last order.

Could you send another copy?

{signoff}`,

    `{greeting}

Unfortunately, we're going to have to delay the order for a few days.

I'll let you know when we're ready to proceed.

{signoff}`,

    `{greeting}

Could you send over your latest price list?

We're reviewing our suppliers for next quarter.

{signoff}`,

    // ========================================================
    // SCHEDULING
    // ========================================================

    `{greeting}

I'll be away from the office on {day}.

If you need anything before then, let me know.

{signoff}`,

    `{greeting}

Can you cover the morning shift on {day}?

I can cover your afternoon shift next week in return.

{signoff}`,

    `{greeting}

The schedule has changed slightly.

You're now working on Friday instead of Thursday.

Sorry for the late notice.

{signoff}`,

    `{greeting}

I'm going to be about half an hour late this morning.

Traffic is completely backed up.

{signoff}`,

    `{greeting}

Would you mind swapping shifts with me next Tuesday?

I've got something I can't get out of.

{signoff}`,

    `{greeting}

Just letting you know that the office will be closed Monday.

You should have received the notice already.

{signoff}`,

    `{greeting}

Are you working late tonight?

I may need to leave something on your desk before I go.

{signoff}`,

    // ========================================================
    // REPORTS / PAPERWORK
    // ========================================================

    `{greeting}

I've gone through the report.

There are a few numbers that don't look right.

Can you check them again?

{signoff}`,

    `{greeting}

Could you send me a copy of the latest report?

The one I have is from last week.

{signoff}`,

    `{greeting}

I made a few corrections to the document.

The updated version is on your desk.

{signoff}`,

    `{greeting}

The paperwork is almost complete.

We're just waiting for {person} to sign off on it.

{signoff}`,

    `{greeting}

I can't find the original paperwork anywhere.

Do you happen to have a copy?

{signoff}`,

    `{greeting}

Please double-check the figures before you send this out.

I noticed a couple of inconsistencies.

{signoff}`,

    `{greeting}

The form was rejected because one of the sections was left blank.

Can you fill it in and send it back?

{signoff}`,

    `{greeting}

I've put the files in the usual place.

Let me know if you can't find them.

{signoff}`,

    // ========================================================
    // OFFICE PROBLEMS
    // ========================================================

    `{greeting}

The printer is broken again.

I've called someone to take a look at it.

{signoff}`,

    `{greeting}

The phones have been acting strangely all morning.

You might have trouble getting through to the main line.

{signoff}`,

    `{greeting}

The photocopier is out of paper.

There should be another box in the storage room.

{signoff}`,

    `{greeting}

The air conditioning has stopped working.

They're sending someone over this afternoon.

{signoff}`,

    `{greeting}

There's a problem with the office computer.

I've asked IT to take a look at it.

{signoff}`,

    `{greeting}

The lights on the second floor are out again.

Apparently they're waiting for an electrician.

{signoff}`,

    `{greeting}

The office is going to be a mess tomorrow.

They're doing some maintenance during the morning.

{signoff}`,

    // ========================================================
    // MISTAKES / APOLOGIES
    // ========================================================

    `{greeting}

Sorry about the mistake in the report.

I've corrected it and sent over a new copy.

{signoff}`,

    `{greeting}

I sent you the wrong attachment earlier.

Please ignore that email.

The correct document is attached here.

{signoff}`,

    `{greeting}

Sorry for the confusion.

I was working from an old version of the schedule.

{signoff}`,

    `{greeting}

I completely missed that yesterday.

That's my fault.

I'll have it finished today.

{signoff}`,

    `{greeting}

I think I may have sent this to the wrong person earlier.

Please disregard the previous message.

{signoff}`,

    `{greeting}

There was an error in the numbers I gave you this morning.

I've checked them again and the corrected figures are below.

{signoff}`,

    // ========================================================
    // OFFICE GOSSIP / SOCIAL
    // ========================================================

    `{greeting}

Did you hear that {person} is leaving?

Apparently they've already given notice.

{signoff}`,

    `{greeting}

Apparently {person} got promoted.

Nobody told me anything about it.

{signoff}`,

    `{greeting}

We're getting someone new in the department next month.

I have no idea who it is yet.

{signoff}`,

    `{greeting}

Everyone is talking about the changes upstairs.

I don't know how much of it is actually true.

{signoff}`,

    `{greeting}

Are you coming to the office dinner?

Apparently quite a few people are going.

{signoff}`,

    `{greeting}

I heard they're changing the management structure again.

We'll see how long this version lasts.

{signoff}`,

    `{greeting}

Don't tell anyone I told you this, but I think {person} is looking for another job.

{signoff}`,

    // ========================================================
    // POSITIVE
    // ========================================================

    `{greeting}

Just wanted to say thanks for helping with {topic}.

It made things a lot easier.

{signoff}`,

    `{greeting}

Good news.

Everything has been approved, so we can finally move forward.

{signoff}`,

    `{greeting}

The client really liked the work.

They specifically mentioned how quickly you got everything done.

{signoff}`,

    `{greeting}

We got the contract.

Looks like all the work we've been doing finally paid off.

{signoff}`,

    `{greeting}

Thanks for staying late yesterday.

I know it wasn't exactly convenient.

{signoff}`,

    // ========================================================
    // NEGATIVE / TENSE
    // ========================================================

    `{greeting}

I'm getting a little concerned about {topic}.

We seem to be going in circles.

Can we talk about it today?

{signoff}`,

    `{greeting}

We really need to sort this out.

The client is getting impatient.

{signoff}`,

    `{greeting}

I'm not sure what happened, but the numbers don't match what we were given.

Can you look into it?

{signoff}`,

    `{greeting}

This is the second time we've had this problem.

Please let me know what's going on.

{signoff}`,

    `{greeting}

I don't want to make a big deal out of this, but we need to be more careful.

We've already had to correct it twice.

{signoff}`,

    // ========================================================
    // SHORT / NATURAL
    // ========================================================

    `Hi,

Can you call me when you get in?

Thanks.`,

    `Hey,

Did you get that report?

{signoff}`,

    `Hi {recipientName},

Quick question.

Do you have the numbers from yesterday?

{signoff}`,

    `Hey,

Are we still meeting at {time}?

{signoff}`,

    `Hi,

Everything is sorted now.

Thanks for your help.

{signoff}`,

    `Hey,

Can you stop by my desk when you get a minute?

{signoff}`,

    `Hi {recipientName},

Just a heads up — {person} called looking for you.

{signoff}`,

    `Hey,

I've left the paperwork on your desk.

Take a look when you get a chance.

{signoff}`,

    // ========================================================
    // 2000s OFFICE / TECHNOLOGY FLAVOR
    // ========================================================

    `{greeting}

The email server seems to be having problems again.

Messages are taking forever to come through.

{signoff}`,

    `{greeting}

I couldn't open the attachment you sent.

It might have been corrupted.

Can you resend it?

{signoff}`,

    `{greeting}

The shared computer is acting up again.

I'll ask IT to look at it tomorrow.

{signoff}`,

    `{greeting}

I tried sending the document earlier, but it bounced back.

I'll try again from the other machine.

{signoff}`,

    `{greeting}

Can you put the files on a CD for me?

I need to take them home tonight.

{signoff}`,

    `{greeting}

The office internet is incredibly slow today.

I can barely get anything done.

{signoff}`,

    `{greeting}

I can't access the shared folder this morning.

Is anyone else having the same problem?

{signoff}`,

    // ========================================================
    // AMBIGUOUS / STORY-FRIENDLY
    // ========================================================

    `{greeting}

Something came up regarding {topic}.

I'd rather explain it in person.

Can you come by after work?

{signoff}`,

    `{greeting}

I spoke with {person} earlier.

They said everything is fine, but I'm not convinced.

Let's talk before you do anything.

{signoff}`,

    `{greeting}

Please don't send anything out yet.

There's something I want to check first.

{signoff}`,

    `{greeting}

I found the document we were looking for.

It's not where I expected it to be.

I'll bring it tomorrow.

{signoff}`,

    `{greeting}

Can you check something for me when you get in?

I'd rather have someone else look at it before I make a decision.

{signoff}`,

    `{greeting}

I left the information you asked for in the usual place.

Let me know once you've got it.

{signoff}`,

    `{greeting}

Don't worry about this for now.

I'll explain when I see you tomorrow.

{signoff}`,

    `{greeting}

I received an unusual call about {topic} this morning.

I'm not sure what to make of it.

Can we talk later?

{signoff}`,

    `{greeting}

Before you send the final version, call me.

There's one thing we need to discuss first.

{signoff}`,

    `{greeting}

I don't think email is the best way to discuss this.

Come by my office when you have a minute.

{signoff}`,

    // ========================================================
    // PERSONALITY / HUMAN IMPERFECTION
    // ========================================================

    `{greeting}

Sorry, forgot to attach the file.

Here it is.

{signoff}`,

    `{greeting}

Ignore my last email.

I was looking at the wrong spreadsheet.

{signoff}`,

    `{greeting}

Sorry for the late reply.

Things have been completely crazy here today.

{signoff}`,

    `{greeting}

Just realized I gave you the wrong date earlier.

It's actually Thursday, not Wednesday.

{signoff}`,

    `{greeting}

I know this is a silly question, but where did we put the old paperwork?

I can't find it anywhere.

{signoff}`,

    `{greeting}

Sorry, I meant to send this to {person}.

Since you've got it now, you might as well have a look.

{signoff}`,

    `{greeting}

I probably should have mentioned this earlier.

The client changed their mind again.

{signoff}`,

    `{greeting}

I thought you'd already been told about this.

Apparently not.

Anyway, here's what's happening...

{signoff}`,

    // ========================================================
    // END-OF-DAY
    // ========================================================

    `{greeting}

I'm heading home now.

Everything on my side is finished.

I'll pick this up again tomorrow.

{signoff}`,

    `{greeting}

Just before I leave — can you make sure {topic} is dealt with tomorrow morning?

Thanks.

{signoff}`,

    `{greeting}

Sorry to send this so late.

I wanted to get it to you before I forgot.

{signoff}`,

    `{greeting}

I'm still here trying to finish this thing.

If you get this tonight, don't worry about replying until tomorrow.

{signoff}`,

    `{greeting}

I'll be in early tomorrow.

If you're around, we can go through everything before everyone else gets in.

{signoff}`
  ]
},




customer: {
  subjects: [
    "Question about my order",
    "Order #{number}",
    "Invoice #{number}",
    "Regarding my account",
    "Delivery question",
    "Problem with my order",
    "Missing item from order",
    "When will this arrive?",
    "Payment question",
    "Request for refund",
    "Can you help?",
    "Need some information",
    "Following up on my order",
    "Order status",
    "Shipping question",
    "Wrong item received",
    "Damaged item",
    "Still waiting",
    "About my recent purchase",
    "Please call me",
    "Customer service",
    "Question about billing",
    "Problem with invoice",
    "Change to my order",
    "Cancel my order",
    "Is this still available?",
    "Looking for information",
    "Request for information",
    "A question",
    "One more question"
  ],

  messages: [

    // ========================================================
    // GENERAL QUESTIONS
    // ========================================================

    `{greeting}

I was wondering if you could give me some information about {topic}.

I'm considering placing an order but wanted to check a few things first.

{signoff}`,

    `{greeting}

Could you tell me if you currently have {topic} available?

I couldn't find any information about it on your website.

{signoff}`,

    `{greeting}

I'm interested in {topic} and was hoping you could tell me a little more about it.

In particular, I'd like to know how long delivery usually takes.

{signoff}`,

    `{greeting}

I have a question about one of your products.

Could someone please get back to me when they have a chance?

{signoff}`,

    `{greeting}

Do you know when {topic} will be available again?

I've been trying to find it for a while.

{signoff}`,

    `{greeting}

Can you tell me whether you deliver to my area?

I'd like to place an order soon.

{signoff}`,

    `{greeting}

I was looking through your catalog and had a question about {topic}.

Could you clarify the specifications for me?

{signoff}`,

    // ========================================================
    // ORDERS
    // ========================================================

    `{greeting}

I'm writing about order #{number}.

Could you let me know when I should expect it to arrive?

{signoff}`,

    `{greeting}

I placed an order a few days ago, but I haven't received any confirmation.

Could you check whether it went through?

{signoff}`,

    `{greeting}

I'd like to check the status of order #{number}.

The order was placed on {day} and I haven't heard anything since.

{signoff}`,

    `{greeting}

Can I make a change to order #{number}?

I'd like to change the delivery address if that's still possible.

{signoff}`,

    `{greeting}

I need to cancel order #{number} if it hasn't been shipped yet.

Please let me know whether that's possible.

{signoff}`,

    `{greeting}

I accidentally ordered the wrong item.

Is there any way to change it before the order is shipped?

{signoff}`,

    `{greeting}

I received my order today, but one of the items wasn't included.

Could you look into this for me?

{signoff}`,

    `{greeting}

My order arrived this morning, but the wrong item was sent.

Could you tell me how I go about getting this corrected?

{signoff}`,

    `{greeting}

The package arrived, but unfortunately the item inside was damaged.

Please let me know what I need to do next.

{signoff}`,

    `{greeting}

I received order #{number} today.

Everything looks fine except that I seem to be missing one item.

{signoff}`,

    // ========================================================
    // SHIPPING
    // ========================================================

    `{greeting}

The tracking information says my package was delivered, but I haven't received anything.

Could you check what happened?

{signoff}`,

    `{greeting}

My order was supposed to arrive on {day}, but it still hasn't shown up.

Do you have any information about the delay?

{signoff}`,

    `{greeting}

Could you send me the tracking number for order #{number}?

I haven't received it yet.

{signoff}`,

    `{greeting}

The tracking information hasn't changed for several days.

Is there a problem with the shipment?

{signoff}`,

    `{greeting}

I was told my order had shipped, but I haven't received anything.

Could you confirm when it actually left your warehouse?

{signoff}`,

    `{greeting}

Is there an additional charge for express delivery?

I'm considering paying for faster shipping.

{signoff}`,

    `{greeting}

Do you know approximately how long delivery takes?

I need the order before {day}.

{signoff}`,

    `{greeting}

The package was delivered to the wrong address.

I'm not sure where it ended up.

Could you help me sort this out?

{signoff}`,

    // ========================================================
    // BILLING / PAYMENTS
    // ========================================================

    `{greeting}

I'm writing about invoice #{number}.

The amount doesn't seem to match what I was quoted.

Could you check this for me?

{signoff}`,

    `{greeting}

I noticed a charge on my account that I don't recognize.

Could you tell me what it is for?

{signoff}`,

    `{greeting}

I believe I've been charged twice for the same order.

Could you look into this and let me know what happened?

{signoff}`,

    `{greeting}

I sent payment for invoice #{number} last week.

Could you confirm that you've received it?

{signoff}`,

    `{greeting}

Could you send me another copy of invoice #{number}?

I seem to have misplaced the original.

{signoff}`,

    `{greeting}

I'm having trouble completing the payment for my order.

The payment keeps being rejected.

Could someone tell me what I should do?

{signoff}`,

    `{greeting}

I'd like to know what payment methods you accept.

I'm planning to place an order shortly.

{signoff}`,

    `{greeting}

There appears to be an error on my latest invoice.

Could someone review it and get back to me?

{signoff}`,

    // ========================================================
    // REFUNDS
    // ========================================================

    `{greeting}

I'd like to request a refund for order #{number}.

The item wasn't what I expected.

Please let me know what your return policy is.

{signoff}`,

    `{greeting}

I returned the item last week but haven't received confirmation of the refund.

Could you check the status for me?

{signoff}`,

    `{greeting}

Can I return an item that I purchased last month?

It's still in the original packaging.

{signoff}`,

    `{greeting}

I'd like to exchange the item from order #{number} for a different size.

Please let me know if that's possible.

{signoff}`,

    `{greeting}

The item I received isn't what was advertised.

I'd like to arrange a return and refund.

{signoff}`,

    `{greeting}

Could you tell me how long refunds normally take?

I returned my order several days ago.

{signoff}`,

    // ========================================================
    // COMPLAINTS
    // ========================================================

    `{greeting}

I'm afraid I'm not very happy with my recent order.

The delivery was late and the item arrived damaged.

Could someone please contact me about this?

{signoff}`,

    `{greeting}

I've contacted customer service twice about this already and haven't received a response.

I'd appreciate it if someone could look into the matter.

{signoff}`,

    `{greeting}

I'm disappointed with the service I've received.

I've been waiting for an answer for over a week now.

{signoff}`,

    `{greeting}

This is the second time I've had a problem with an order.

Could someone please explain what's going on?

{signoff}`,

    `{greeting}

I'm beginning to wonder whether anyone is actually looking into this.

I've sent several messages and haven't received a useful response.

{signoff}`,

    `{greeting}

I understand that delays happen, but I was told the order would arrive by {day}.

Please let me know what the situation is.

{signoff}`,

    // ========================================================
    // CUSTOMER SERVICE
    // ========================================================

    `{greeting}

I spoke to someone in customer service yesterday about this.

They told me someone would get back to me, but I haven't heard anything.

{signoff}`,

    `{greeting}

Could someone from customer service please call me?

It's easier to explain the situation over the phone.

{signoff}`,

    `{greeting}

I was given your email address by someone in your customer service department.

They said you might be able to help with {topic}.

{signoff}`,

    `{greeting}

I'm following up on a conversation I had with one of your representatives.

They asked me to send some additional information.

{signoff}`,

    `{greeting}

Could you tell me who I should speak to regarding {topic}?

I'm not sure which department handles this.

{signoff}`,

    `{greeting}

I was told this matter had been resolved, but it doesn't appear to have been.

Could someone check the account again?

{signoff}`,

    // ========================================================
    // BUSINESS CUSTOMERS
    // ========================================================

    `{greeting}

I'm writing on behalf of our company regarding order #{number}.

Could you confirm the expected delivery date?

{signoff}`,

    `{greeting}

We'd like to place another order similar to our previous one.

Could you send us an updated quotation?

{signoff}`,

    `{greeting}

Could you send a copy of your current price list?

We're reviewing our suppliers at the moment.

{signoff}`,

    `{greeting}

We received the shipment this morning.

Everything appears to be correct, so thank you for getting it out so quickly.

{signoff}`,

    `{greeting}

We're still waiting for part of the shipment.

Could you check whether the remaining items have been sent?

{signoff}`,

    `{greeting}

Could you confirm the billing address you have on file for our account?

We recently changed offices.

{signoff}`,

    `{greeting}

We need to increase the quantity on our current order.

Has the order already been processed?

{signoff}`,

    // ========================================================
    // WEBSITE / ONLINE ORDERING
    // ========================================================

    `{greeting}

I tried placing an order through your website, but the order wouldn't go through.

Could you let me know if there's a problem with the site?

{signoff}`,

    `{greeting}

I found the item I was looking for on your website, but the ordering page doesn't seem to be working.

Could someone take a look?

{signoff}`,

    `{greeting}

The price shown on the website is different from the price in my order confirmation.

Which one is correct?

{signoff}`,

    `{greeting}

I tried contacting you through the website yesterday but didn't receive a response.

I'm following up here instead.

{signoff}`,

    `{greeting}

Is the information on your website still current?

I'm interested in ordering {topic}.

{signoff}`,

    `{greeting}

I noticed that an item listed on your website is marked as available, but I was told it was out of stock.

Could you clarify?

{signoff}`,

    // ========================================================
    // ACCOUNT
    // ========================================================

    `{greeting}

I'm having trouble accessing my account.

Could you tell me how I reset my password?

{signoff}`,

    `{greeting}

I'd like to update the address associated with my account.

Could you tell me how to do that?

{signoff}`,

    `{greeting}

I haven't used my account in a while and wanted to make sure everything is still active.

Could you confirm?

{signoff}`,

    `{greeting}

Could you send me a copy of my recent account statement?

I need it for my records.

{signoff}`,

    `{greeting}

There seems to be some incorrect information on my account.

Could someone update it for me?

{signoff}`,

    // ========================================================
    // FOLLOW-UPS
    // ========================================================

    `{greeting}

I'm just following up on my previous message.

I haven't received a response yet.

Could you let me know what's happening?

{signoff}`,

    `{greeting}

Just checking whether you've had a chance to look into this.

I'd appreciate an update when you have one.

{signoff}`,

    `{greeting}

I wanted to follow up regarding order #{number}.

Please let me know if you need any additional information from me.

{signoff}`,

    `{greeting}

I'm still waiting for a response regarding this.

Could someone please get back to me?

{signoff}`,

    `{greeting}

Just wanted to check that my previous email reached the right department.

Please let me know.

{signoff}`,

    // ========================================================
    // POSITIVE
    // ========================================================

    `{greeting}

I just wanted to say thank you.

The order arrived earlier than expected and everything was perfect.

{signoff}`,

    `{greeting}

Thanks for sorting this out so quickly.

I appreciate the help.

{signoff}`,

    `{greeting}

I received the replacement today.

Everything looks good.

Thanks again for your help.

{signoff}`,

    `{greeting}

Just wanted to let you know that everything arrived safely.

Thanks for the excellent service.

{signoff}`,

    // ========================================================
    // SHORT / SIMPLE
    // ========================================================

    `Hello,

Could you tell me when order #{number} is expected to arrive?

Thanks.`,

    `Hi,

I'm still waiting for order #{number}.

Can you check the status?

Thanks.`,

    `Hello,

Can someone please call me regarding order #{number}?

Thanks.`,

    `Hi,

I received the wrong item.

What should I do?

{signoff}`,

    `Hello,

Could you send me another copy of invoice #{number}?

Thanks.`,

    `Hi,

Is {topic} currently in stock?

{signoff}`,

    `Hello,

I'd like to cancel order #{number} if possible.

Please let me know.

Thanks.`,

    // ========================================================
    // SLIGHTLY MESSY / HUMAN
    // ========================================================

    `{greeting}

Sorry, I forgot to include the order number in my last message.

It's #{number}.

Hopefully that helps.

{signoff}`,

    `{greeting}

Ignore my previous email.

I found the information I was looking for.

Sorry about that.

{signoff}`,

    `{greeting}

I think I may have misunderstood the delivery date.

Could you confirm when the order is actually expected?

{signoff}`,

    `{greeting}

Sorry for sending another email.

I just wanted to make sure this doesn't get missed.

{signoff}`,

    `{greeting}

I called earlier but couldn't get through.

Could someone email me back instead?

{signoff}`,

    `{greeting}

I'm not sure if I'm contacting the right person.

If not, could you forward this to whoever handles these requests?

{signoff}`,

    // ========================================================
    // AMBIGUOUS / STORY-FRIENDLY
    // ========================================================

    `{greeting}

I'm trying to confirm some information from an older order.

Could you check whether you still have the records for order #{number}?

{signoff}`,

    `{greeting}

I was told that someone had already contacted you about this.

I'm just trying to confirm what happened.

Could you check your records?

{signoff}`,

    `{greeting}

There's some information on my account that doesn't look familiar.

Before I make any changes, I'd like to understand where it came from.

{signoff}`,

    `{greeting}

I received a message from someone claiming to be from your company.

Could you confirm whether the message was legitimate?

{signoff}`,

    `{greeting}

Could you confirm who is handling my order?

I've received several different answers and I'm not sure which one is correct.

{signoff}`,

    `{greeting}

Someone contacted me regarding order #{number}, but I wasn't expecting the call.

Can you confirm whether this was from your company?

{signoff}`,

    `{greeting}

I need to verify something regarding an older transaction.

Please let me know who I should speak with.

{signoff}`,

    `{greeting}

I was given some information that doesn't match what's showing on my account.

Could someone look into this before I proceed?

{signoff}`,

    // ========================================================
    // PERIOD-FLAVORED
    // ========================================================

    `{greeting}

I placed the order through your website yesterday.

The confirmation page came up, but I never received the confirmation email.

Could you check whether the order went through?

{signoff}`,

    `{greeting}

I tried calling your customer service number this afternoon but couldn't get through.

Is there another number I can use?

{signoff}`,

    `{greeting}

I sent the requested information by fax earlier today.

Could you confirm that it was received?

{signoff}`,

    `{greeting}

I was told to email this address regarding my account.

Hopefully I've got the right department.

{signoff}`,

    `{greeting}

I printed the order confirmation but the reference number is difficult to read.

Could you confirm the number for me?

{signoff}`,

    // ========================================================
    // CLOSING / NATURAL VARIATION
    // ========================================================

    `{greeting}

I'd appreciate it if you could get back to me when you have a chance.

Thanks for your help.

{signoff}`,

    `{greeting}

Please let me know if you need anything else from me.

I'll be happy to provide it.

{signoff}`,

    `{greeting}

Any information you can provide would be appreciated.

Thanks in advance.

{signoff}`,

    `{greeting}

I hope you can help.

Please let me know what the next step is.

{signoff}`,

    `{greeting}

Thanks for taking the time to look into this.

I look forward to hearing from you.

{signoff}`
  ]
},



family: {
  subjects: [
    "Call me",
    "Sunday",
    "Mom's birthday",
    "Your brother",
    "Christmas plans",
    "Are you coming?",
    "Dinner this weekend",
    "How are you?",
    "Just checking in",
    "Did you get home?",
    "Your sister called",
    "Dad wants to know",
    "About the weekend",
    "Don't forget",
    "When are you visiting?",
    "We haven't heard from you",
    "Quick question",
    "Can you call?",
    "Your package arrived",
    "About your car",
    "How's the new place?",
    "Thanks for calling",
    "Sorry I missed you",
    "Plans for next week",
    "Family dinner",
    "Your cousin",
    "About the holidays",
    "Are you working Sunday?",
    "Let me know",
    "One more thing"
  ],

  messages: [

    // ========================================================
    // CHECKING IN
    // ========================================================

    `{greeting}

Just wanted to check in and see how you're doing.

We haven't heard from you in a few days.

{signoff}`,

    `{greeting}

How are things going?

You sounded a little tired when we spoke the other day.

Give me a call when you get a chance.

{signoff}`,

    `{greeting}

Haven't heard from you lately.

I hope everything is okay.

{signoff}`,

    `{greeting}

Just checking that you got home alright.

Call me when you have a minute.

{signoff}`,

    `{greeting}

I tried calling earlier but you weren't home.

Nothing important, just wanted to talk.

{signoff}`,

    `{greeting}

How's everything going?

Are you settling into the new place okay?

{signoff}`,

    `{greeting}

You never called after you got back.

Let me know how the trip went.

{signoff}`,

    `{greeting}

Just wanted to hear from you.

It's been a while since we talked.

{signoff}`,

    // ========================================================
    // FAMILY PLANS
    // ========================================================

    `{greeting}

Don't forget we're all getting together on Sunday.

Mom wants everyone there around noon.

Try not to be late.

{signoff}`,

    `{greeting}

Are you coming for dinner on Sunday?

Let me know so we know how much food to make.

{signoff}`,

    `{greeting}

We're having everyone over this weekend.

You should come if you're free.

{signoff}`,

    `{greeting}

What are you doing for the holidays?

We haven't made any plans yet.

{signoff}`,

    `{greeting}

We're thinking about having dinner on Saturday instead.

Would that work for you?

{signoff}`,

    `{greeting}

Your aunt and uncle are coming over next weekend.

Mom wants to know if you'll be here too.

{signoff}`,

    `{greeting}

Everyone is coming over on Sunday.

It would be nice if you could make it.

{signoff}`,

    `{greeting}

Are you working Sunday?

If not, come by for lunch.

{signoff}`,

    // ========================================================
    // PARENTS
    // ========================================================

    `{greeting}

Your dad asked if you'd called lately.

You should probably give him a ring before he starts complaining about it again.

{signoff}`,

    `{greeting}

Mom wanted me to remind you that her birthday is next week.

Have you figured out what you're getting her?

{signoff}`,

    `{greeting}

Dad's car is finally out of the garage.

He says it cost more than the car is worth.

{signoff}`,

    `{greeting}

Mom says hello.

She was asking how work is going.

{signoff}`,

    `{greeting}

Dad called earlier.

He wants you to call him when you're home.

{signoff}`,

    `{greeting}

Mom has been trying to get hold of you.

Give her a call when you get this.

{signoff}`,

    `{greeting}

Dad says the computer is acting up again.

Apparently it won't connect to the internet.

{signoff}`,

    `{greeting}

Mom found some of your old things while cleaning out the spare room.

She wants to know if you still want them.

{signoff}`,

    // ========================================================
    // SIBLINGS
    // ========================================================

    `{greeting}

Your brother called earlier.

He said he'll be staying with us for a couple of days.

Just thought I'd let you know.

{signoff}`,

    `{greeting}

Your sister was asking about you yesterday.

Apparently she hasn't heard from you either.

{signoff}`,

    `{greeting}

Have you talked to {person} lately?

They were asking about you.

{signoff}`,

    `{greeting}

Your brother still has your old stereo.

I told him you might want it back.

{signoff}`,

    `{greeting}

Your sister left something here for you.

I'll give it to you next time I see you.

{signoff}`,

    `{greeting}

Your brother wants to know if you can help him move next Saturday.

I told him I'd ask you.

{signoff}`,

    `{greeting}

I ran into your sister today.

She said she's coming over Sunday.

{signoff}`,

    `{greeting}

Your brother called twice while you were out.

He didn't say what he wanted.

{signoff}`,

    // ========================================================
    // GRANDPARENTS / EXTENDED FAMILY
    // ========================================================

    `{greeting}

Grandma wants to know when you're coming to visit.

You should give her a call.

{signoff}`,

    `{greeting}

Your uncle called yesterday.

He said they're planning to come down next month.

{signoff}`,

    `{greeting}

Everyone is talking about getting together this summer.

We need to figure out dates soon.

{signoff}`,

    `{greeting}

Your cousin is starting a new job next week.

I thought you'd want to know.

{signoff}`,

    `{greeting}

Aunt Susan sent a card for you.

I'll keep it here until you come by.

{signoff}`,

    `{greeting}

Grandpa isn't feeling too bad.

He's still complaining about the weather, though.

{signoff}`,

    // ========================================================
    // BIRTHDAYS / HOLIDAYS
    // ========================================================

    `{greeting}

Don't forget Mom's birthday next week.

We're planning dinner on Saturday.

{signoff}`,

    `{greeting}

What do you want for your birthday?

Don't say you don't want anything.

{signoff}`,

    `{greeting}

Your birthday card arrived today.

I'll give it to you when I see you.

{signoff}`,

    `{greeting}

Are you coming home for Christmas this year?

We'd really like to have you here.

{signoff}`,

    `{greeting}

We're trying to figure out Christmas plans.

Let me know what days you'll be around.

{signoff}`,

    `{greeting}

Don't forget to call Grandma on her birthday.

She'll never let us hear the end of it if everyone forgets.

{signoff}`,

    `{greeting}

I've already started buying Christmas presents.

If there's anything specific you want, tell me now.

{signoff}`,

    // ========================================================
    // FAVORS
    // ========================================================

    `{greeting}

Could you do me a favor?

If you're near the house this week, could you pick up the spare key?

{signoff}`,

    `{greeting}

Can you give me a ride on Saturday?

My car is still at the garage.

{signoff}`,

    `{greeting}

Could you pick up Mom from the station on Friday?

I'll owe you one.

{signoff}`,

    `{greeting}

If you're going shopping, could you pick up some groceries for us?

I'll pay you back.

{signoff}`,

    `{greeting}

Do you still have the number for {person}?

I can't find it anywhere.

{signoff}`,

    `{greeting}

Could you check on the house while we're away?

We'll only be gone for a few days.

{signoff}`,

    `{greeting}

Can you bring those boxes when you come over?

They're still in the garage.

{signoff}`,

    `{greeting}

Would you mind taking a look at the computer next time you're here?

It has been doing something strange again.

{signoff}`,

    // ========================================================
    // LIFE UPDATES
    // ========================================================

    `{greeting}

Just wanted to let you know I got the new job.

I start next Monday.

{signoff}`,

    `{greeting}

We're finally getting the kitchen remodeled.

It should be finished by the end of the month.

{signoff}`,

    `{greeting}

I bought a new car yesterday.

It's nothing fancy, but at least it runs properly.

{signoff}`,

    `{greeting}

We're thinking about moving.

Nothing decided yet, but I'll let you know if anything happens.

{signoff}`,

    `{greeting}

I finally finished fixing up the spare room.

You wouldn't recognize the place.

{signoff}`,

    `{greeting}

Your cousin got engaged.

Apparently they've been planning it for months.

{signoff}`,

    `{greeting}

We're going away for a few days next month.

I'll send you the dates once we've booked everything.

{signoff}`,

    `{greeting}

I finally got around to fixing the roof.

It took longer than I expected.

{signoff}`,

    // ========================================================
    // WORRY / CONCERN
    // ========================================================

    `{greeting}

You didn't sound like yourself when we talked yesterday.

Is everything alright?

{signoff}`,

    `{greeting}

I'm a little worried.

You've been unusually quiet lately.

Please call when you get this.

{signoff}`,

    `{greeting}

You don't have to tell me anything if you don't want to.

Just let me know you're okay.

{signoff}`,

    `{greeting}

I know you've been busy, but everyone is starting to wonder where you've been.

Give someone a call.

{signoff}`,

    `{greeting}

Please call me when you get this.

It's not an emergency, but I'd rather talk to you directly.

{signoff}`,

    // ========================================================
    // APOLOGIES
    // ========================================================

    `{greeting}

Sorry I missed your birthday.

Things got completely away from me this week.

I'll make it up to you.

{signoff}`,

    `{greeting}

Sorry I didn't call back yesterday.

I got home late and completely forgot.

{signoff}`,

    `{greeting}

I'm sorry about what I said earlier.

I was tired and frustrated.

{signoff}`,

    `{greeting}

Sorry we couldn't make it over this weekend.

Hopefully we'll see you next week.

{signoff}`,

    `{greeting}

Sorry I missed dinner.

I should have called earlier.

{signoff}`,

    // ========================================================
    // THANKS
    // ========================================================

    `{greeting}

Thanks again for helping me yesterday.

I really appreciate it.

{signoff}`,

    `{greeting}

Thanks for looking after the house while we were away.

Everything was exactly as we left it.

{signoff}`,

    `{greeting}

Thanks for the birthday present.

You really didn't have to do that.

{signoff}`,

    `{greeting}

Thanks for giving me a ride yesterday.

I owe you one.

{signoff}`,

    `{greeting}

Just wanted to say thanks for calling.

It was good to hear from you.

{signoff}`,

    // ========================================================
    // FAMILY ARGUMENTS / TENSION
    // ========================================================

    `{greeting}

I'm still annoyed about what happened yesterday.

I'd rather talk about it than keep ignoring each other.

{signoff}`,

    `{greeting}

I don't want to argue about this again.

Let's just talk when everyone has had some time to cool down.

{signoff}`,

    `{greeting}

I know you're upset, but you should really talk to Mom.

She's been worrying about you.

{signoff}`,

    `{greeting}

I'm not taking sides in this.

You two need to work it out yourselves.

{signoff}`,

    `{greeting}

I don't know what happened between you and {person}.

Maybe you should give them a call.

{signoff}`,

    `{greeting}

I think everyone is making this into a bigger deal than it needs to be.

Let's just leave it alone for now.

{signoff}`,

    // ========================================================
    // EVERYDAY HOUSEHOLD
    // ========================================================

    `{greeting}

The heating is making that noise again.

Dad says he'll look at it this weekend.

{signoff}`,

    `{greeting}

The washing machine finally stopped working.

We're going to have to get someone to look at it.

{signoff}`,

    `{greeting}

The phone bill came in today.

I'll leave your part on the counter.

{signoff}`,

    `{greeting}

The cable company called again.

I told them we'd call back later.

{signoff}`,

    `{greeting}

The neighbor asked about you.

Apparently they haven't seen you around lately.

{signoff}`,

    `{greeting}

Your old mail is still coming here.

You should probably change your address.

{signoff}`,

    `{greeting}

I found one of your old jackets in the closet.

Do you still want it?

{signoff}`,

    `{greeting}

The garage is finally cleaned out.

There's still a box of your things in there.

{signoff}`,

    // ========================================================
    // TRAVEL
    // ========================================================

    `{greeting}

What time are you getting back on {day}?

We'll make sure someone is home.

{signoff}`,

    `{greeting}

Let me know when you arrive.

I worry when I don't hear from you.

{signoff}`,

    `{greeting}

How was the trip?

Did everything go alright?

{signoff}`,

    `{greeting}

We're leaving Friday morning.

We'll probably be back Sunday night.

{signoff}`,

    `{greeting}

Don't forget your passport this time.

I don't want another phone call from the airport.

{signoff}`,

    `{greeting}

Give us a call from the hotel when you get settled.

{signoff}`,

    // ========================================================
    // MONEY / PRACTICAL MATTERS
    // ========================================================

    `{greeting}

Just reminding you about the money you borrowed.

No rush, but let me know when you think you'll be able to pay it back.

{signoff}`,

    `{greeting}

I paid the bill for you.

You can give me the money next time you're here.

{signoff}`,

    `{greeting}

The insurance paperwork came in.

I'll leave it with the rest of your things.

{signoff}`,

    `{greeting}

Can you check whether you've received the letter from the bank?

They sent something here by mistake.

{signoff}`,

    `{greeting}

There's a package here for you.

I'll keep it safe until you can pick it up.

{signoff}`,

    // ========================================================
    // SHORT / NATURAL
    // ========================================================

    `Hi,

Call me when you get this.

Mom.`,

    `Hey,

Are you coming Sunday?

Let me know.

{signoff}`,

    `Hi {recipientName},

Everything okay?

Give me a call.

{signoff}`,

    `Hey,

Your package came.

I'll keep it here.

{signoff}`,

    `Hi,

Don't forget dinner tomorrow.

{signoff}`,

    `Hey,

Dad wants you to call him.

{signoff}`,

    `Hi,

We're all going to be here Saturday.

Hope you can make it.

{signoff}`,

    // ========================================================
    // MESSY / HUMAN
    // ========================================================

    `{greeting}

Sorry, forgot to mention this earlier.

Your aunt is coming on Saturday too.

{signoff}`,

    `{greeting}

Ignore my last email.

I got the dates wrong.

We're actually meeting Sunday.

{signoff}`,

    `{greeting}

I was going to call but figured I'd just send this.

Anyway, let me know what you think.

{signoff}`,

    `{greeting}

Sorry this is so late.

I just remembered I hadn't told you.

{signoff}`,

    `{greeting}

I think I have the wrong number for you.

Call me when you get this so I can save the right one.

{signoff}`,

    `{greeting}

Never mind.

I just found what I was looking for.

Sorry.

{signoff}`,

    // ========================================================
    // 2000s FLAVOR
    // ========================================================

    `{greeting}

I tried calling you but your phone was off.

Call me when you get home.

{signoff}`,

    `{greeting}

I left you a message on the answering machine.

Not sure if you got it.

{signoff}`,

    `{greeting}

The computer is working again.

I have no idea what was wrong with it.

{signoff}`,

    `{greeting}

I sent the pictures by email.

Let me know if they came through okay.

{signoff}`,

    `{greeting}

The internet is down again.

I'll call the phone company tomorrow.

{signoff}`,

    // ========================================================
    // AMBIGUOUS / STORY-FRIENDLY
    // ========================================================

    `{greeting}

Someone came by looking for you earlier.

I didn't give them any information.

Call me when you get this.

{signoff}`,

    `{greeting}

I received something here that I think belongs to you.

I'll keep it until you can come by.

{signoff}`,

    `{greeting}

I had a strange phone call earlier.

They asked about you.

I didn't know what to tell them.

{signoff}`,

    `{greeting}

Can you call me when you're somewhere private?

There's something I'd rather explain over the phone.

{signoff}`,

    `{greeting}

Don't worry about this right now.

I'll explain everything when I see you.

{signoff}`,

    `{greeting}

I found the old papers you were looking for.

They're here with me.

Let me know when you want them.

{signoff}`,

    `{greeting}

Someone left a message for you.

They didn't say much, just asked you to call them back.

{signoff}`,

    `{greeting}

I don't want to discuss this over email.

Please call me tonight if you can.

{signoff}`,

    // ========================================================
    // WARM / AFFECTIONATE
    // ========================================================

    `{greeting}

Just wanted to say that we miss you.

Come visit when you get the chance.

{signoff}`,

    `{greeting}

It was really nice seeing you yesterday.

We should do that more often.

{signoff}`,

    `{greeting}

Take care of yourself, okay?

Don't work too hard.

{signoff}`,

    `{greeting}

Hope you're doing well.

Everyone here sends their love.

{signoff}`,

    `{greeting}

It was good having you home.

The house seems very quiet now.

{signoff}`,

    // ========================================================
    // PRACTICAL / ROUTINE
    // ========================================================

    `{greeting}

What time are you coming over?

I need to know when to expect you.

{signoff}`,

    `{greeting}

I'll be home after {time}.

If you're coming by before then, let me know.

{signoff}`,

    `{greeting}

The spare key is still under the usual place.

Just put it back when you're finished.

{signoff}`,

    `{greeting}

I'll leave the door unlocked for you.

Just make sure you lock it when you leave.

{signoff}`,

    `{greeting}

Let me know if you're going to be late.

We're planning to eat around {time}.

{signoff}`
  ]
},




newsletter: {
  subjects: [
    "This Week's News",
    "The Weekly Update",
    "What's New This Week",
    "Monthly Newsletter",
    "News & Updates",
    "This Month at a Glance",
    "Latest News",
    "Community Update",
    "What's Happening",
    "Your Weekly Digest",
    "The Friday Update",
    "News From Around Town",
    "Member Newsletter",
    "Customer Newsletter",
    "January News",
    "February News",
    "March News",
    "April News",
    "May News",
    "June News",
    "July News",
    "August News",
    "September News",
    "October News",
    "November News",
    "December News",
    "A Few Things to Share",
    "News You May Have Missed",
    "Upcoming Events",
    "Important Updates"
  ],

  messages: [

    // ========================================================
    // GENERAL NEWSLETTER
    // ========================================================

    `{greeting}

Here's this week's update with the latest news, announcements, and upcoming events.

IN THIS ISSUE

- {topic}
- Upcoming events
- Community news
- A few reminders

Thanks for reading.

{signoff}`,

    `{greeting}

Welcome to this month's newsletter.

We've got several updates to share, including some changes coming soon and a few events worth putting on your calendar.

{signoff}`,

    `{greeting}

Here's what's been happening over the past few weeks.

We've had a busy month, with several new developments and plenty more planned for the weeks ahead.

{signoff}`,

    `{greeting}

It's time for another weekly update.

Here's a quick look at what's new, what's coming up, and a few things you may have missed.

{signoff}`,

    // ========================================================
    // COMMUNITY
    // ========================================================

    `{greeting}

COMMUNITY NEWS

The local community center has announced several new programs for the coming month.

Registration opens Monday.

See you there.

{signoff}`,

    `{greeting}

A lot has been happening in the neighborhood this month.

We've got several community events coming up, including the annual summer gathering.

{signoff}`,

    `{greeting}

Thanks to everyone who came out to last weekend's event.

We had a great turnout and raised more than expected.

{signoff}`,

    `{greeting}

The community garden is looking for volunteers again this weekend.

No experience is necessary.

If you're interested, just stop by Saturday morning.

{signoff}`,

    `{greeting}

There will be a neighborhood meeting next Tuesday evening.

We'll be discussing the proposed changes to the area.

Everyone is welcome.

{signoff}`,

    // ========================================================
    // LOCAL EVENTS
    // ========================================================

    `{greeting}

UPCOMING EVENTS

Saturday — Community Fair
Sunday — Local Market
Tuesday — Neighborhood Meeting
Friday — Summer Concert

We hope to see you at one of the events.

{signoff}`,

    `{greeting}

Don't forget about this weekend's festival.

There will be food, music, games, and activities for the whole family.

{signoff}`,

    `{greeting}

The annual charity walk is coming up soon.

Registration is still open.

All proceeds will go toward local community programs.

{signoff}`,

    `{greeting}

There's still time to sign up for this month's workshop.

The session will cover {topic} and is open to everyone.

{signoff}`,

    `{greeting}

Mark your calendar.

The annual neighborhood picnic will be held on Saturday.

Bring something to share if you can.

{signoff}`,

    // ========================================================
    // BUSINESS NEWS
    // ========================================================

    `{greeting}

BUSINESS UPDATE

Several local businesses have announced new services this month.

We've also welcomed two new stores to the area.

{signoff}`,

    `{greeting}

A number of changes are coming to local businesses over the next few months.

We'll keep you updated as more information becomes available.

{signoff}`,

    `{greeting}

This month we're highlighting several businesses that have recently opened in the area.

Take a look and support your local community.

{signoff}`,

    `{greeting}

LOCAL BUSINESS NEWS

Several shops will be extending their opening hours during the holiday season.

Check with individual businesses for their schedules.

{signoff}`,

    // ========================================================
    // CLUB / ORGANIZATION
    // ========================================================

    `{greeting}

MEMBERS' UPDATE

Thank you to everyone who participated in last month's activities.

We've got several new events planned for the coming weeks.

{signoff}`,

    `{greeting}

A quick update for all members.

Membership renewals are now open for the coming year.

Please renew before the end of the month.

{signoff}`,

    `{greeting}

We're pleased to announce several new activities for members this season.

There's something for everyone, so take a look at the schedule.

{signoff}`,

    `{greeting}

Thank you for being a member.

Your continued support helps us keep the organization running and allows us to offer more programs.

{signoff}`,

    // ========================================================
    // COMPANY NEWS
    // ========================================================

    `{greeting}

COMPANY NEWS

We've had a busy month here.

Several new projects are underway, and we're pleased to welcome a few new members to the team.

{signoff}`,

    `{greeting}

We're pleased to announce that {person} has joined the team.

They'll be working with the {department} department.

Please give them a warm welcome.

{signoff}`,

    `{greeting}

A few changes are coming to the company over the next several weeks.

We'll provide more details as plans are finalized.

{signoff}`,

    `{greeting}

Congratulations to everyone who helped make this month's project a success.

We couldn't have done it without everyone's hard work.

{signoff}`,

    // ========================================================
    // PRODUCT / CUSTOMER NEWS
    // ========================================================

    `{greeting}

NEW THIS MONTH

We've added several new items to our range.

Take a look at the latest products and let us know what you think.

{signoff}`,

    `{greeting}

We're pleased to announce the arrival of our latest products.

They're available now through our usual ordering channels.

{signoff}`,

    `{greeting}

A few popular items are back in stock.

If you've been waiting for something, now may be a good time to take another look.

{signoff}`,

    `{greeting}

We're making a few changes to our services this month.

Existing customers will continue to receive the same support as before.

{signoff}`,

    // ========================================================
    // SPECIAL OFFERS
    // ========================================================

    `{greeting}

THIS MONTH'S SPECIAL

For a limited time, members can receive a discount on selected items.

The offer runs until the end of the month.

{signoff}`,

    `{greeting}

This week's special offer is now available.

Don't miss your chance to save on selected products.

{signoff}`,

    `{greeting}

As a thank you to our customers, we're offering a special discount this month.

See the details below.

{signoff}`,

    `{greeting}

SPECIAL ANNOUNCEMENT

We've got a few special offers available this weekend.

Stop by and see what's available.

{signoff}`,

    // ========================================================
    // TECHNOLOGY / INTERNET FLAVOR
    // ========================================================

    `{greeting}

TECHNOLOGY UPDATE

We've made several improvements to the website this month.

Some pages may look slightly different, but the main features remain the same.

{signoff}`,

    `{greeting}

We've updated our website with several new features.

If you haven't visited recently, take a look.

{signoff}`,

    `{greeting}

A reminder that the website will be unavailable for a short period this weekend while we perform maintenance.

We'll be back online as soon as possible.

{signoff}`,

    `{greeting}

We've received several questions about our online services.

We've put together a short guide answering the most common questions.

{signoff}`,

    // ========================================================
    // 2000s INTERNET / MAILING LIST FLAVOR
    // ========================================================

    `{greeting}

Welcome to the latest edition of our newsletter.

If you'd like to unsubscribe, please follow the instructions at the bottom of this message.

{signoff}`,

    `{greeting}

Thanks for subscribing to our mailing list.

Here's the latest news, updates, and announcements from the past month.

{signoff}`,

    `{greeting}

You are receiving this message because you signed up for our newsletter.

Here's what's new this month.

{signoff}`,

    `{greeting}

FORWARD THIS MESSAGE TO A FRIEND

We've got plenty of news to share this month.

Thanks for being part of the community.

{signoff}`,

    // ========================================================
    // CLUBS / HOBBIES
    // ========================================================

    `{greeting}

CLUB NEWS

Our next meeting will be held on Tuesday evening.

We'll be discussing upcoming activities and plans for the rest of the year.

{signoff}`,

    `{greeting}

Thanks to everyone who attended last month's meeting.

We've posted the schedule for the next few events.

{signoff}`,

    `{greeting}

The club is looking for new members.

If you've been thinking about joining, this is a good time to come along.

{signoff}`,

    `{greeting}

This month's featured activity is {topic}.

We'll be holding a special session this Saturday.

Everyone is welcome.

{signoff}`,

    // ========================================================
    // SCHOOL / EDUCATION
    // ========================================================

    `{greeting}

SCHOOL NEWS

The new term is underway and there are several important dates coming up.

Please check the calendar for details.

{signoff}`,

    `{greeting}

A reminder that registration for the upcoming classes closes Friday.

Spaces are still available in several courses.

{signoff}`,

    `{greeting}

Congratulations to everyone who participated in this year's competition.

We've had some excellent results.

{signoff}`,

    `{greeting}

There will be an information session next week for anyone interested in the new programs.

Everyone is welcome to attend.

{signoff}`,

    // ========================================================
    // CHARITY
    // ========================================================

    `{greeting}

CHARITY UPDATE

Thanks to everyone's generosity, we've been able to raise enough to support several local projects.

We couldn't have done it without you.

{signoff}`,

    `{greeting}

Our next fundraising event is coming up this month.

There will be food, games, and activities for the whole family.

{signoff}`,

    `{greeting}

We're still looking for volunteers for this year's charity drive.

Even a few hours can make a difference.

{signoff}`,

    `{greeting}

Thank you to everyone who donated last month.

Your contributions are already being put to good use.

{signoff}`,

    // ========================================================
    // SEASONAL
    // ========================================================

    `{greeting}

SUMMER UPDATE

The weather is finally warming up and we've got plenty planned for the coming months.

Here's what's happening around town.

{signoff}`,

    `{greeting}

AUTUMN NEWS

The new season is here, along with several new events and activities.

Take a look at what's coming up.

{signoff}`,

    `{greeting}

WINTER UPDATE

The holidays are approaching quickly.

Here's a list of upcoming events and important dates.

{signoff}`,

    `{greeting}

SPRING NEWS

Spring is finally here.

We've got several new programs and events planned for the coming months.

{signoff}`,

    // ========================================================
    // GENERAL INFORMATION
    // ========================================================

    `{greeting}

A few reminders for this month:

- Please check your membership information.
- Registration closes Friday.
- The office will be closed Monday.
- Our next meeting is Tuesday.

Thanks for your attention.

{signoff}`,

    `{greeting}

Here's a quick reminder about several upcoming dates.

Please mark your calendar so you don't miss anything.

{signoff}`,

    `{greeting}

We've received a few questions recently about {topic}.

Here are the answers to some of the most common ones.

{signoff}`,

    `{greeting}

A number of small changes are coming over the next few weeks.

Nothing major, but we wanted to make sure everyone was aware.

{signoff}`,

    // ========================================================
    // EDITORIAL / HUMAN INTEREST
    // ========================================================

    `{greeting}

FEATURED STORY

This month we're talking to {person}, who has been involved with the community for several years.

They shared some interesting stories about how things have changed.

{signoff}`,

    `{greeting}

IN THE COMMUNITY

One of our longtime members recently celebrated an important milestone.

Congratulations, and here's to many more years.

{signoff}`,

    `{greeting}

LOCAL SPOTLIGHT

This month we're taking a look at some of the people and businesses that help make the community what it is.

{signoff}`,

    `{greeting}

A LOOK BACK

It's hard to believe how much has changed over the past year.

Here's a look at some of the highlights.

{signoff}`,

    // ========================================================
    // POLLS / FEEDBACK
    // ========================================================

    `{greeting}

WE WANT TO HEAR FROM YOU

We're planning next year's activities and would like your opinion.

Please take a few minutes to tell us what you'd like to see.

{signoff}`,

    `{greeting}

We've received a lot of feedback about {topic}.

Thank you to everyone who took the time to write in.

{signoff}`,

    `{greeting}

Have an idea for a future event?

Send it our way.

We're always looking for suggestions.

{signoff}`,

    `{greeting}

We're conducting a short survey this month.

It should only take a few minutes to complete.

Your feedback is appreciated.

{signoff}`,

    // ========================================================
    // ANNOUNCEMENTS
    // ========================================================

    `{greeting}

IMPORTANT ANNOUNCEMENT

Please note that our office will be closed on {day}.

Normal hours will resume the following day.

{signoff}`,

    `{greeting}

We're pleased to announce that the new location is now open.

Our regular hours remain unchanged.

{signoff}`,

    `{greeting}

Please be aware of some upcoming changes to our schedule.

The new schedule will take effect next week.

{signoff}`,

    `{greeting}

We've got some exciting news to share.

More details will be announced over the coming weeks.

{signoff}`,

    // ========================================================
    // SHORT NEWSLETTER
    // ========================================================

    `Hi,

Here's your weekly update.

A few things happening this week:

- {topic}
- New events
- Community news

More information will follow.

{signoff}`,

    `Hello,

A quick update for everyone.

The next meeting is Tuesday, the event is Saturday, and registration is still open.

Hope to see you there.

{signoff}`,

    `Hi,

Just a few things to remember this month.

Check the calendar for upcoming events and don't forget to renew your membership.

{signoff}`,

    // ========================================================
    // LIGHT / CASUAL
    // ========================================================

    `{greeting}

Hard to believe it's already the end of the month.

Here's a quick look at what's been happening and what's coming up next.

{signoff}`,

    `{greeting}

Another month has gone by, so here's your latest update.

There's quite a bit to cover this time around.

{signoff}`,

    `{greeting}

We've got a busy few weeks ahead.

Here's everything you need to know.

{signoff}`,

    `{greeting}

Before everyone gets too busy with the holidays, here's one last update for the year.

Thanks for following along.

{signoff}`,

    // ========================================================
    // AMBIGUOUS / STORY-FRIENDLY
    // ========================================================

    `{greeting}

A few changes are being made behind the scenes this month.

We don't have much more information to share yet, but we'll provide another update when we can.

{signoff}`,

    `{greeting}

We've received several questions about recent changes.

For now, everything continues as normal.

We'll let everyone know if that changes.

{signoff}`,

    `{greeting}

There has been some confusion regarding last month's announcement.

Please disregard the earlier information and wait for the updated notice.

{signoff}`,

    `{greeting}

We're currently reviewing some older records.

If you receive a request for additional information, please respond as soon as possible.

{signoff}`,

    `{greeting}

An unexpected issue came up during our regular review.

There's nothing you need to do right now.

We'll provide more information if necessary.

{signoff}`,

    `{greeting}

We've made a small change to the way certain requests are handled.

Most people won't notice any difference.

{signoff}`,

    // ========================================================
    // CLOSING
    // ========================================================

    `{greeting}

That's all for this month's update.

Thanks for your continued support, and we'll see you again next month.

{signoff}`,

    `{greeting}

That's it for this week.

Thanks for reading, and have a great weekend.

{signoff}`,

    `{greeting}

Thanks for staying up to date with us.

We'll be back next month with more news.

{signoff}`,

    `{greeting}

As always, thanks for being part of the community.

See you next time.

{signoff}`
  ]
},



spam: {
  subjects: [
    "You've Been Selected!",
    "Congratulations!",
    "Special Offer",
    "Important Notice",
    "You Have Won!",
    "Limited Time Offer",
    "Act Now!",
    "Exclusive Opportunity",
    "Free Gift",
    "Claim Your Prize",
    "Make Money Fast",
    "Don't Miss This!",
    "Your Account",
    "Urgent Response Required",
    "Special Invitation",
    "Amazing Opportunity",
    "Get Rich Quick",
    "Lowest Prices!",
    "One Time Offer",
    "You Won!",
    "Important Information",
    "Open Immediately",
    "Free Sample",
    "Special Promotion",
    "Congratulations Winner",
    "Last Chance",
    "Don't Delete",
    "Read This Now",
    "You've Been Chosen",
    "Offer Expires Soon"
  ],

  messages: [

    // ========================================================
    // PRIZE / WINNER
    // ========================================================

    `{greeting}

CONGRATULATIONS!

You have been selected as one of our lucky winners.

You are eligible to receive a special prize.

To claim your prize, simply reply to this email with your full name and contact information.

Don't miss this opportunity!

{signoff}`,

    `{greeting}

Good news!

Your email address was selected in our latest promotional drawing.

You may be entitled to a cash prize.

Please contact us as soon as possible for more information.

{signoff}`,

    `{greeting}

Congratulations!

You have won a special promotional award.

We are currently holding your prize and need to hear from you before it can be released.

Reply today to begin the claim process.

{signoff}`,

    `{greeting}

WINNER NOTIFICATION

Our records indicate that your email address has been selected.

You have been chosen to receive a special reward.

Please respond within 7 days.

{signoff}`,

    // ========================================================
    // MONEY
    // ========================================================

    `{greeting}

Would you like to make extra money from home?

We have an exciting opportunity available to a limited number of people.

No previous experience required.

Reply for more information.

{signoff}`,

    `{greeting}

Make money while you sleep!

Our simple system has helped people around the world earn extra income without leaving home.

Find out how today.

{signoff}`,

    `{greeting}

Are you tired of living paycheck to paycheck?

We can show you a simple way to increase your monthly income.

No special skills required.

Contact us for details.

{signoff}`,

    `{greeting}

This is an opportunity you don't want to miss.

Join thousands of people already earning additional income online.

Limited places available.

{signoff}`,

    `{greeting}

Turn your spare time into extra cash.

Our program is easy to start and requires very little investment.

Reply with "INFO" to learn more.

{signoff}`,

    // ========================================================
    // PRODUCTS / SALES
    // ========================================================

    `{greeting}

SPECIAL OFFER!

Save big on selected products this week only.

These prices won't last forever.

Click below or reply for more information.

{signoff}`,

    `{greeting}

You've been selected to receive an exclusive discount.

Save up to 70% on selected items.

This offer is available for a limited time only.

{signoff}`,

    `{greeting}

LOWEST PRICES GUARANTEED!

We've got incredible deals on products you won't want to miss.

Order today while supplies last.

{signoff}`,

    `{greeting}

SPECIAL PROMOTION

Buy now and receive an additional gift absolutely FREE.

This offer expires soon.

Don't miss out!

{signoff}`,

    `{greeting}

FREE SAMPLE!

We're offering a limited number of free samples to new customers.

Simply reply with your mailing information.

{signoff}`,

    // ========================================================
    // HEALTH / MIRACLE CLAIMS
    // ========================================================

    `{greeting}

Discover the amazing secret thousands of people are talking about!

Our revolutionary new product can help you look and feel better than ever.

Find out more today.

{signoff}`,

    `{greeting}

Have you tried everything?

Our new breakthrough formula could be exactly what you've been looking for.

Special introductory pricing available now.

{signoff}`,

    `{greeting}

You won't believe the results!

People everywhere are talking about this amazing new product.

Order now while supplies last.

{signoff}`,

    // ========================================================
    // FINANCIAL / BUSINESS
    // ========================================================

    `{greeting}

We have an exclusive business opportunity available.

Our partners are looking for motivated individuals interested in building an additional source of income.

No experience necessary.

Reply for details.

{signoff}`,

    `{greeting}

URGENT BUSINESS OPPORTUNITY

We are currently looking for reliable partners in your area.

This opportunity is extremely limited.

Contact us immediately if interested.

{signoff}`,

    `{greeting}

A private investment opportunity has become available.

Expected returns are significantly higher than traditional investments.

If you're interested, reply for more information.

{signoff}`,

    `{greeting}

We are currently accepting a small number of new business partners.

This offer is strictly limited.

Please contact us as soon as possible.

{signoff}`,

    // ========================================================
    // FAKE ACCOUNT / NOTICE
    // ========================================================

    `{greeting}

IMPORTANT NOTICE

We are contacting you regarding your account.

Please respond to this message to confirm that your information is still correct.

Failure to respond may result in your account being placed on hold.

{signoff}`,

    `{greeting}

Your account requires attention.

Please contact our office as soon as possible regarding an outstanding matter.

Do not ignore this message.

{signoff}`,

    `{greeting}

IMPORTANT

Our records indicate that we have not received a response from you.

Please confirm your information immediately.

{signoff}`,

    `{greeting}

Your account has been selected for a routine review.

Please reply with your current contact information.

Thank you for your cooperation.

{signoff}`,

    // ========================================================
    // URGENCY
    // ========================================================

    `{greeting}

URGENT!

This offer expires today.

If you want to take advantage of this opportunity, you must respond immediately.

Don't wait!

{signoff}`,

    `{greeting}

FINAL NOTICE

We have attempted to contact you several times.

This is your final opportunity to respond.

Please reply immediately.

{signoff}`,

    `{greeting}

TIME SENSITIVE

Your response is required as soon as possible.

Please contact us today to avoid missing this opportunity.

{signoff}`,

    `{greeting}

LAST CHANCE!

There are only a few remaining places available.

Once they're gone, this offer will not be available again.

{signoff}`,

    // ========================================================
    // DATING / PERSONAL
    // ========================================================

    `{greeting}

Hello!

I came across your email address and wanted to introduce myself.

I would love to get to know you better.

Write back if you're interested.

{signoff}`,

    `{greeting}

Hi there,

I'm looking for someone to talk to and thought I'd send you a message.

Maybe we could get to know each other.

{signoff}`,

    `{greeting}

You seem like an interesting person.

I'd love to hear more about you.

Write back and tell me something about yourself.

{signoff}`,

    // ========================================================
    // CHARITY / APPEALS
    // ========================================================

    `{greeting}

Please help support our important cause.

Every contribution, no matter how small, can make a difference.

Please consider making a donation today.

{signoff}`,

    `{greeting}

We are currently raising funds to support families in need.

Your donation could help provide food and supplies.

Please consider helping us reach our goal.

{signoff}`,

    `{greeting}

A small donation can make a big difference.

We are asking for your support during this important campaign.

Thank you for considering our request.

{signoff}`,

    // ========================================================
    // CHAIN / FORWARD STYLE
    // ========================================================

    `{greeting}

Please forward this message to everyone you know.

A special opportunity is currently available, but only for a limited time.

The more people who participate, the better the results.

{signoff}`,

    `{greeting}

IMPORTANT MESSAGE

Please do not ignore this email.

Forward it to five people and you may receive a special reward.

It only takes a minute.

{signoff}`,

    `{greeting}

You probably received this message from someone you know.

Please forward it to your friends and family so they can take advantage of this offer too.

{signoff}`,

    // ========================================================
    // RANDOM / WEIRD
    // ========================================================

    `{greeting}

I am contacting you regarding a confidential opportunity.

Your email address was provided to us by a mutual contact.

Please reply if you would like additional information.

{signoff}`,

    `{greeting}

We have been trying to reach you regarding an important matter.

Unfortunately, we cannot provide details until we verify your identity.

Please reply to this message.

{signoff}`,

    `{greeting}

Your name was recommended to us by someone in your area.

We would like to discuss an opportunity with you.

Please respond if interested.

{signoff}`,

    `{greeting}

This message may look unusual, but we assure you that the offer is legitimate.

You have been selected for a special promotion.

Contact us for details.

{signoff}`,

    `{greeting}

Hello,

We have something very important to tell you.

Unfortunately, there is not enough room in this email to explain everything.

Please reply for the full details.

{signoff}`,

    // ========================================================
    // 2000s-STYLE INTERNET PROMOTION
    // ========================================================

    `{greeting}

WELCOME!

You are receiving this message because you signed up for our newsletter or promotional mailing list.

Take advantage of our latest special offers today!

To unsubscribe, simply reply with REMOVE.

{signoff}`,

    `{greeting}

SPECIAL INTERNET OFFER!

You've been selected to receive a FREE gift.

No purchase necessary.

Limited quantities available.

Reply now to claim yours.

{signoff}`,

    `{greeting}

Congratulations!

Your email address has been entered into our monthly promotion.

Check below for details about your special offer.

{signoff}`,

    `{greeting}

FREE DOWNLOAD!

Get access to our latest collection absolutely free.

Limited-time offer.

Reply now for instructions.

{signoff}`,

    `{greeting}

You've been invited!

Join thousands of other members enjoying our exclusive online community.

Registration is free.

Sign up today.

{signoff}`,

    // ========================================================
    // GENERIC MASS-MAIL
    // ========================================================

    `{greeting}

Dear Friend,

We are pleased to inform you about an exciting opportunity.

If you are interested, please reply to this message and one of our representatives will contact you.

Best wishes.

{signoff}`,

    `{greeting}

Dear Customer,

Thank you for your interest in our services.

We would like to offer you an exclusive opportunity available only to selected recipients.

Please contact us for details.

{signoff}`,

    `{greeting}

Dear Valued Customer,

We appreciate your business and would like to offer you a special promotion.

This offer is available for a limited time.

{signoff}`,

    // ========================================================
    // SHORT / LOW-EFFORT SPAM
    // ========================================================

    `CONGRATULATIONS!

You have won!

Reply now for details.`,

    `SPECIAL OFFER!

Save BIG today!

Limited time only.`,

    `You have been selected!

Reply to claim your prize.`,

    `FREE GIFT!

No purchase necessary.

Reply now!`,

    `MAKE MONEY FAST!

No experience required.

Contact us today.`,

    `URGENT!

Please respond immediately.

Important information awaits.`,

    // ========================================================
    // BADLY WRITTEN / HUMAN-LIKE SPAM
    // ========================================================

    `{greeting}

We have good opportunity for you.

You can make very good money from home.

If interested please reply.

{signoff}`,

    `{greeting}

Congratulations you are winner.

Please contact us soon to receive your prize.

Thank you.

{signoff}`,

    `{greeting}

Dear Sir/Madam,

We have important business proposal for you.

Please reply if you are interested.

Regards.

{signoff}`,

    `{greeting}

Hello friend,

I have very important opportunity and need someone trustworthy.

Please write me back.

{signoff}`,

    `{greeting}

You have been selected from many people.

This is very good opportunity and should not be missed.

Please respond.

{signoff}`,

    // ========================================================
    // AMBIGUOUS / STORY-FRIENDLY
    // ========================================================

    `{greeting}

We are attempting to reach you regarding information that was recently submitted using this email address.

Please reply so we can confirm a few details.

{signoff}`,

    `{greeting}

Your contact information was recently provided to us.

We would like to verify that we have reached the correct person.

Please respond at your earliest convenience.

{signoff}`,

    `{greeting}

We have received a request containing your contact information.

Before proceeding, we need to confirm that the request was authorized.

Please reply to this email.

{signoff}`,

    `{greeting}

We are following up regarding a previous communication.

If you did not request this information, simply disregard this message.

Otherwise, please reply for further details.

{signoff}`,

    `{greeting}

A representative attempted to contact you earlier.

Please reply with a convenient time to reach you.

{signoff}`,

    // ========================================================
    // CLASSIC "TOO GOOD TO BE TRUE"
    // ========================================================

    `{greeting}

You could be missing out on an incredible opportunity.

People just like you are earning extra money every day.

Find out how you can get started.

{signoff}`,

    `{greeting}

Imagine receiving an extra income every month without changing your current job.

It may sound too good to be true, but thousands have already joined.

Contact us today.

{signoff}`,

    `{greeting}

Why keep paying full price?

Our members receive access to special discounts unavailable to the general public.

Join today and start saving.

{signoff}`,

    // ========================================================
    // CLOSING PUSH
    // ========================================================

    `{greeting}

Don't wait.

This opportunity won't be available forever.

Reply today for complete information.

{signoff}`,

    `{greeting}

What are you waiting for?

Take the first step today.

Simply reply to this message and we'll send you all the details.

{signoff}`,

    `{greeting}

There's no obligation to learn more.

Reply now and discover what you've been missing.

{signoff}`,

    `{greeting}

Thank you for your time.

We hope to hear from you soon.

{signoff}`
  ]
},

automated: {
  subjects: [
    "Order Confirmation",
    "Account Notification",
    "Payment Received",
    "Payment Reminder",
    "Password Reset",
    "Registration Confirmation",
    "Welcome",
    "Your Request Has Been Received",
    "Delivery Notification",
    "Shipping Confirmation",
    "Service Notification",
    "System Message",
    "Scheduled Maintenance",
    "Reminder",
    "Appointment Reminder",
    "Subscription Renewal",
    "Account Update",
    "Security Notice",
    "Your Ticket Has Been Updated",
    "New Message",
    "Notification",
    "Monthly Statement",
    "Invoice Available",
    "Receipt",
    "Confirmation Required",
    "Action Required",
    "Request Completed",
    "Request Cancelled",
    "Status Update",
    "Automatic Notification"
  ],

  messages: [

    // ========================================================
    // GENERAL NOTIFICATIONS
    // ========================================================

    `Hello,

This is an automated message to let you know that your request has been received.

No further action is required at this time.

Thank you.`,

    `Hello,

This is an automatic notification regarding your account.

Please do not reply to this message.

Thank you.`,

    `Hello,

Your recent request has been successfully processed.

You will receive another notification if further action is required.

Thank you.`,

    `Hello,

This message was generated automatically.

Please keep this email for your records.

Thank you.`,

    `Hello,

This is a confirmation that your information has been received.

If you did not submit this request, please contact customer service.`,

    // ========================================================
    // ORDER CONFIRMATIONS
    // ========================================================

    `Hello {recipientName},

Thank you for your order.

Order number: #{number}

Your order has been received and is currently being processed.

You will receive another email when your order has shipped.

Thank you for your business.`,

    `Hello {recipientName},

Your order #{number} has been confirmed.

We are currently preparing your items for shipment.

Please keep this email for your records.`,

    `Hello {recipientName},

This email confirms that your order has been successfully placed.

Order reference: #{number}

Estimated delivery: {day}

Thank you.`,

    `Hello {recipientName},

We've received your order.

Order #{number} is currently being processed.

No further action is required.`,

    // ========================================================
    // SHIPPING
    // ========================================================

    `Hello {recipientName},

Your order #{number} has shipped.

You should receive your package shortly.

Please allow additional time for delivery depending on your location.

Thank you.`,

    `Hello {recipientName},

Your order #{number} has been dispatched.

Estimated delivery is {day}.

Please contact us if your package does not arrive within the expected time.`,

    `Hello {recipientName},

Your package is on its way.

Order number: #{number}

Please retain this email for your records.`,

    `Hello {recipientName},

A shipment associated with your account has been sent.

Expected delivery: {day}

Thank you.`,

    `Hello {recipientName},

Your package has been marked as delivered.

If you did not receive your package, please contact customer service.`,

    // ========================================================
    // PAYMENT
    // ========================================================

    `Hello {recipientName},

We have received your payment for invoice #{number}.

Amount received has been applied to your account.

Thank you.`,

    `Hello {recipientName},

This is a reminder that payment for invoice #{number} is due.

Please refer to your invoice for payment details.

Thank you.`,

    `Hello {recipientName},

Your payment could not be processed.

Please review your payment information and try again.

If you believe this message was sent in error, contact customer service.`,

    `Hello {recipientName},

A payment has been processed successfully.

Reference number: #{number}

Please retain this email as confirmation.`,

    `Hello {recipientName},

Your account currently has an outstanding balance.

Please review your account information and make payment at your earliest convenience.`,

    // ========================================================
    // INVOICES / RECEIPTS
    // ========================================================

    `Hello {recipientName},

Your invoice #{number} is now available.

Please log in to your account to view the invoice.

Thank you.`,

    `Hello {recipientName},

Attached is your receipt for your recent purchase.

Transaction reference: #{number}

Thank you for your business.`,

    `Hello {recipientName},

Your monthly statement is now available.

Please retain this message for your records.`,

    `Hello {recipientName},

This is your automatic invoice notification.

Invoice number: #{number}

Please contact us if you believe any information is incorrect.`,

    // ========================================================
    // ACCOUNT
    // ========================================================

    `Hello {recipientName},

Your account information has been updated.

If you did not make this change, please contact customer service immediately.`,

    `Hello {recipientName},

A request was made to update the information associated with your account.

If you did not make this request, please contact us.`,

    `Hello {recipientName},

Your account has been successfully created.

You may now log in using the information provided during registration.

Welcome.`,

    `Hello {recipientName},

Your registration has been completed successfully.

Thank you for signing up.`,

    `Hello {recipientName},

Your account has been inactive for some time.

No action is required, but we wanted to remind you that your account is still available.`,

    // ========================================================
    // PASSWORD / LOGIN
    // ========================================================

    `Hello {recipientName},

A password reset request was received for your account.

If you made this request, follow the instructions provided on the password reset page.

If you did not request a password reset, no action is required.`,

    `Hello {recipientName},

Your password has been successfully changed.

If you did not make this change, please contact customer service immediately.`,

    `Hello {recipientName},

Your login information has been updated.

Please use your new information the next time you access your account.`,

    `Hello {recipientName},

There was a failed login attempt on your account.

If this was not you, please review your account information.`,

    `Hello {recipientName},

Your account has been temporarily locked following several unsuccessful login attempts.

Please contact customer service if you need assistance.`,

    // ========================================================
    // SECURITY / GENERIC SYSTEM
    // ========================================================

    `Hello {recipientName},

This is an automatic security notification.

A change was recently made to your account.

If you do not recognize this activity, please contact support.`,

    `Hello {recipientName},

Our system detected a recent change to your account information.

No action is required if you made this change yourself.`,

    `Hello {recipientName},

This is an automated notification regarding recent activity associated with your account.

Please review your account if you do not recognize the activity.`,

    `Hello {recipientName},

Your account has been accessed recently.

If you believe this activity was unauthorized, please contact us.`,

    // ========================================================
    // SERVICE STATUS
    // ========================================================

    `Hello,

Our services will be temporarily unavailable on {day} while scheduled maintenance is performed.

We apologize for any inconvenience.`,

    `Hello,

Scheduled maintenance is currently underway.

Some services may be unavailable during this period.

Normal service is expected to resume shortly.`,

    `Hello,

The scheduled maintenance has been completed.

All services should now be operating normally.

Thank you for your patience.`,

    `Hello,

We are currently experiencing a temporary service interruption.

Our technicians are working to restore normal service.

We apologize for the inconvenience.`,

    `Hello,

The service interruption has been resolved.

All systems are now operating normally.

Thank you for your patience.`,

    // ========================================================
    // SUPPORT TICKETS
    // ========================================================

    `Hello {recipientName},

Your support request has been received.

Ticket number: #{number}

A representative will review your request and respond as soon as possible.`,

    `Hello {recipientName},

There has been an update to support ticket #{number}.

Please log in to your account to view the latest information.`,

    `Hello {recipientName},

Your support ticket #{number} has been closed.

If you still require assistance, please submit a new request.`,

    `Hello {recipientName},

We are still working on support ticket #{number}.

No action is required from you at this time.`,

    `Hello {recipientName},

Additional information is required to continue processing support ticket #{number}.

Please contact customer service.`,

    // ========================================================
    // APPOINTMENTS
    // ========================================================

    `Hello {recipientName},

This is a reminder that you have an appointment scheduled for {day} at {time}.

Please contact us if you need to reschedule.

Thank you.`,

    `Hello {recipientName},

Your appointment has been confirmed.

Date: {day}
Time: {time}

We look forward to seeing you.`,

    `Hello {recipientName},

Your appointment has been cancelled.

Please contact us if you would like to schedule another appointment.`,

    `Hello {recipientName},

Your appointment has been rescheduled.

New date: {day}
New time: {time}

Please contact us if this time does not work for you.`,

    // ========================================================
    // SUBSCRIPTIONS
    // ========================================================

    `Hello {recipientName},

Your subscription has been renewed successfully.

Your next renewal will occur next month.

Thank you for being a customer.`,

    `Hello {recipientName},

Your subscription is scheduled to renew on {day}.

Please review your account information if you wish to make any changes.`,

    `Hello {recipientName},

Your subscription has been cancelled.

You will continue to have access until the end of your current billing period.`,

    `Hello {recipientName},

Your subscription payment could not be processed.

Please update your payment information to avoid interruption of service.`,

    // ========================================================
    // REGISTRATION / CONFIRMATION
    // ========================================================

    `Hello {recipientName},

Your registration has been received.

Please keep this message as confirmation of your registration.

Thank you.`,

    `Hello {recipientName},

Thank you for registering.

Your confirmation number is #{number}.

Please retain this number for your records.`,

    `Hello {recipientName},

We have received your request to register for {topic}.

Your request is currently being processed.`,

    `Hello {recipientName},

Your registration for {topic} has been confirmed.

We look forward to seeing you.`,

    // ========================================================
    // REMINDERS
    // ========================================================

    `Hello {recipientName},

This is a reminder regarding {topic}.

Please complete the requested action by {day}.

Thank you.`,

    `Hello {recipientName},

This is an automatic reminder that you have an outstanding request.

Please review your account when convenient.`,

    `Hello {recipientName},

Just a reminder that your requested information is still waiting for you.

No further action is required at this time.`,

    `Hello {recipientName},

Our records indicate that you have not yet completed {topic}.

Please complete the process at your earliest convenience.`,

    // ========================================================
    // NEWS / UPDATES
    // ========================================================

    `Hello {recipientName},

We wanted to let you know about a recent change to our services.

Please review the information provided on our website.

Thank you.`,

    `Hello,

We have updated our terms and conditions.

The changes will take effect on {day}.

Please review the updated information at your convenience.`,

    `Hello {recipientName},

We've made some improvements to our service.

You may notice a few changes the next time you log in.

Thank you for your continued support.`,

    `Hello {recipientName},

This is an automatic notification regarding an upcoming change to our service.

No action is required at this time.`,

    // ========================================================
    // DELIVERY / PICKUP
    // ========================================================

    `Hello {recipientName},

Your order is ready for pickup.

Please bring your order confirmation when collecting your items.

Order #{number}`,

    `Hello {recipientName},

Your package is currently awaiting pickup.

Please collect it before {day} to avoid having it returned.`,

    `Hello {recipientName},

We were unable to complete delivery of your package.

Please contact the delivery office to arrange another delivery.`,

    // ========================================================
    // APPLICATION / REQUEST
    // ========================================================

    `Hello {recipientName},

Your application has been received.

Reference number: #{number}

We will contact you when a decision has been made.`,

    `Hello {recipientName},

Your application has been approved.

Further information will be sent separately.

Thank you.`,

    `Hello {recipientName},

We have completed processing your request.

Reference number: #{number}

No further action is required.`,

    `Hello {recipientName},

Your request could not be completed.

Please contact customer service if you require additional information.`,

    // ========================================================
    // GENERIC CORPORATE
    // ========================================================

    `Dear Customer,

Thank you for contacting us.

This is an automated confirmation that your message has been received.

A representative will respond if a response is required.`,

    `Dear Customer,

This email confirms that we have received your recent communication.

Please do not reply to this automatically generated message.`,

    `Dear Customer,

Your recent transaction has been recorded successfully.

Please retain this email for your records.`,

    `Dear Customer,

This is an automatically generated message.

If you have questions regarding this notification, please contact our customer service department.`,

    // ========================================================
    // 2000s-STYLE AUTOMATED EMAILS
    // ========================================================

    `Hello,

Thank you for signing up.

Your registration information has been successfully recorded in our system.

This is an automated message. Please do not reply.`,

    `Hello,

You are receiving this email because you recently requested information from our website.

If you did not make this request, please disregard this message.`,

    `Hello,

Your online request has been successfully submitted.

Your reference number is #{number}.

Please save this email for future reference.`,

    `Hello,

This message has been sent automatically by our system.

Replies to this address are not monitored.`,

    `Hello,

Your request was received at {time}.

We will process your request during normal business hours.

Thank you.`,

    // ========================================================
    // SHORT SYSTEM MESSAGES
    // ========================================================

    `Your request has been received.

Reference: #{number}

No further action is required.`,

    `Payment received.

Transaction: #{number}

Thank you.`,

    `Order confirmed.

Order: #{number}

Thank you for your purchase.`,

    `Your order has shipped.

Order: #{number}

Thank you.`,

    `Password reset requested.

If you did not request this, please contact support.`,

    `Account updated successfully.

This is an automated notification.`,

    `Service notification:

Scheduled maintenance will occur on {day}.

Thank you for your patience.`,

    // ========================================================
    // ERROR / FAILURE
    // ========================================================

    `Hello {recipientName},

We were unable to complete your recent request.

Please try again later.

If the problem continues, contact customer support.`,

    `Hello {recipientName},

An error occurred while processing your request.

No changes were made to your account.

Please try again.`,

    `Hello {recipientName},

We were unable to process your payment.

Please verify your payment information and try again.`,

    `Hello {recipientName},

The requested information could not be found.

Please verify the reference number and try again.`,

    `Hello {recipientName},

Your request has expired.

Please submit a new request if you still require assistance.`,

    // ========================================================
    // AMBIGUOUS / STORY-FRIENDLY SYSTEM MAIL
    // ========================================================

    `Hello {recipientName},

This is an automated notification regarding a recent change associated with your account.

If you did not initiate this change, please contact us for assistance.`,

    `Hello {recipientName},

A request was recently submitted using your account information.

If you do not recognize this request, please review your account activity.`,

    `Hello {recipientName},

Our records have been updated following a recent request.

Please retain this message for your records.

No further action is required at this time.`,

    `Hello,

An automated process has completed successfully.

Reference number: #{number}

Additional information may be provided separately.`,

    `Hello {recipientName},

Your request has been placed on hold pending additional information.

No action is required until you receive further instructions.`,

    `Hello {recipientName},

We are unable to provide additional information through this automated notification.

Please contact the appropriate department if you require assistance.`,

    `Hello,

A recent transaction associated with your account has been recorded.

Please review your records and contact us if the information appears incorrect.`,

    // ========================================================
    // FRIENDLY AUTOMATED
    // ========================================================

    `Hello {recipientName},

Thanks for getting in touch!

We've received your message and someone will get back to you as soon as possible.

This is an automated confirmation.`,

    `Hello {recipientName},

Welcome!

Your account is now active.

Thanks for joining us.`,

    `Hello {recipientName},

Thanks for your order!

We've received it and are getting everything ready.

We'll let you know when it ships.`,

    `Hello {recipientName},

Thanks for contacting us.

Your request is now in our system.

We'll be in touch soon.`,

    // ========================================================
    // CLOSING / STANDARD FOOTERS
    // ========================================================

    `This is an automatically generated email.

Please do not reply to this message.

If you require assistance, contact customer service.`,

    `This email was sent automatically.

Replies to this address are not monitored.

Thank you.`,

    `This is a system-generated notification.

Please retain this email for your records.

Thank you.`,

    `Thank you.

This is an automated message and does not require a response.`
  ]
}
  };

  function random(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function emailAddress(name) {
    const clean = name.toLowerCase().replace(/\s+/g, ".");

    return `${clean}${randomNumber(1, 99)}@${random(emailProviders)}`;
  }

  function replaceTokens(text, data) {
    return text.replace(/\{(\w+)\}/g, (_, key) => {
      return data[key] ?? `{${key}}`;
    });
  }

  function createMessageId(fromUser) {
    //return `msg_${fromUser}_${randomNumber(100000, 999999)}`;
    return `msg_${fromUser}${gameTimer.elapsed()}`;
  }

  function generate(options = {}) {
    const category =
      options.category ||
      random(Object.keys(templates));

    const domain = options.domain || random(emailProviders);

    const template = templates[category];

    if (!template) {
      throw new Error(`Unknown email category: ${category}`);
    }

    const fromName = options.fromName; //|| random(names);

    const toName = options.toName; // || random(names.filter(name => name !== fromName));

    const data = {
      fromName,
      toName,
      recipientName: toName,
      company: options.company || random(companies),
      topic: options.topic || random(topics),
      person: random(names.filter(
        name => name !== fromName && name !== toName
      )),
      day: random(days),
      time: random(times),
      number: randomNumber(10000, 99999),

      greeting: `Hi ${toName},`,

      signoff: `Best,\n${fromName}`
    };

    const subject = replaceTokens(
      random(template.subjects),
      data
    );

    const message = replaceTokens(
      random(template.messages),
      data
    );

    return {
      messageId: createMessageId(options.fromName),

      from: options.fromEmail, //|| emailAddress(fromName),

      to: options.toEmail, // || emailAddress(toName),

      attachment: options.attachment || null,

      subject,

      timestamp: options.timestamp || gameTimer.elapsed(),

      message
    };
  }

  return {
    generate
  };
})();





/*/ Example
const email = EmailGenerator.generate({
  category: "work",
  fromName: "Daniel",
  toName: "Alex"
});

console.log(email);*/