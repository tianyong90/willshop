<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\User;
use EasyWeChat;

class SyncWechatFans implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    const PAGE_SIZE = 20;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $officialAccount = EasyWeChat::officialAccount();

        $nextOpenid = null;
        do {
            $lists = $officialAccount->user->list($nextOpenid);

            if ($openids = $lists['data']['openid'] ?? []) {
                $batchResult = $officialAccount->user->select($openids);

                foreach ($batchResult['user_info_list'] as $key => $fan) {
                    \App\User::updateOrCreate(['openid' => $fan['openid']], $fan);
                }
            }

            $nextOpenid = $lists['next_openid'];
        } while ($lists['next_openid']);
    }
}
