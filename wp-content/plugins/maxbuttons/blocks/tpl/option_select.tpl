{if:label} 	<label for='%%id%%' class='color'>%%label%%</label> {/if:label} 
{if:before_input} %%before_input%% {/if:before_input}
<div class="input option_select %%name%%"  {if:conditional}data-show="%%conditional%%"{/if:conditional}>
	<select name='%%name%%' id='%%id%%'>
		{for:options}
			<option name='%%key%%'>%%item%%</option>
		{/for:options}
	</select>
</div>
