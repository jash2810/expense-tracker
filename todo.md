<h1>Tasks Todos</h1>
<hr/>
<h3>Make an API to update User</h3>
<li>
  Make an API such that only name of the user can be updated in <i>{details: {name: 'xyz abc'}}</i>.
</li><br/><br/>
<b>PUT: /user/profile</b><br/>
<u>payload (data to be sent)<u>:<br/>
{<br/>
  userId: //from localstorage ofc,<br/>
  name: //from the field that user updates<br/>
}<br/>
<br/>
<u>response JSON</u>:<br/>
{date: null, msg: 'user updated', success: true}<br/>
<hr/>
<h3>Add another page like profile called "Statistics"</h3>
<p>You need to add another component named Statistics in the UI. In this component we will call the filter API to display the stats to the user. What you need to do is as follows.</p>
<li>make a form. which will take from and to date from the user.</li>
<li>make the API call using this from and to date, to fetch the filtered data.</li>
<li>display this data's <i>total credited amount</i> and <i>total debited amount</i>. just these 2 items for now (nothing else)</li>
<li>make total credited amount of green color, and total debited amount of red color.</li>
<hr/>
<small><i>deadline for this tasks is: 11/11/2020 - 09:00 PM</i></small>
